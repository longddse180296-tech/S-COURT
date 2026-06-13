param(
    [switch]$SkipInstall,
    [switch]$NoBuild
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$frontend = Join-Path $root 'FE'
$backend = Join-Path $root 'BE'
$runtime = Join-Path $root '.runtime'
$logs = Join-Path $runtime 'logs'
$pidFile = Join-Path $runtime 'dev-processes.json'

New-Item -ItemType Directory -Force -Path $logs | Out-Null

function Get-ListeningProcess {
    param([int]$Port)

    $connection = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
        Select-Object -First 1

    if ($connection) {
        return Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue
    }

    return $null
}

function Wait-ForUrl {
    param(
        [string]$Url,
        [int]$TimeoutSeconds = 45,
        [int]$RequestTimeoutSeconds = 10
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        try {
            $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec $RequestTimeoutSeconds
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
                return $true
            }
        }
        catch {
            Start-Sleep -Milliseconds 500
        }
    }

    return $false
}

if (-not $SkipInstall -and -not (Test-Path (Join-Path $frontend 'node_modules'))) {
    Write-Host 'Installing frontend dependencies...'
    & npm.cmd ci --prefix $frontend
    if ($LASTEXITCODE -ne 0) {
        throw 'Frontend dependency installation failed.'
    }
}

if (-not $NoBuild) {
    Write-Host 'Building backend...'
    & dotnet build (Join-Path $backend 'SCourt.sln')
    if ($LASTEXITCODE -ne 0) {
        throw 'Backend build failed.'
    }
}

$apiProcess = Get-ListeningProcess -Port 5000
if (-not $apiProcess) {
    Write-Host 'Starting backend on http://localhost:5000...'
    $apiProcess = Start-Process `
        -FilePath 'dotnet' `
        -ArgumentList 'run --project src/API/SCourt.API.csproj --no-build' `
        -WorkingDirectory $backend `
        -RedirectStandardOutput (Join-Path $logs 'backend.log') `
        -RedirectStandardError (Join-Path $logs 'backend-error.log') `
        -WindowStyle Hidden `
        -PassThru
}
else {
    Write-Host "Backend is already running (PID $($apiProcess.Id))."
}

$frontendProcess = Get-ListeningProcess -Port 5173
if (-not $frontendProcess) {
    Write-Host 'Starting frontend on http://localhost:5173...'
    $frontendProcess = Start-Process `
        -FilePath 'npm.cmd' `
        -ArgumentList 'run dev -- --host 0.0.0.0' `
        -WorkingDirectory $frontend `
        -RedirectStandardOutput (Join-Path $logs 'frontend.log') `
        -RedirectStandardError (Join-Path $logs 'frontend-error.log') `
        -WindowStyle Hidden `
        -PassThru
}
else {
    Write-Host "Frontend is already running (PID $($frontendProcess.Id))."
}

@{
    backendPid = $apiProcess.Id
    frontendPid = $frontendProcess.Id
    startedAt = (Get-Date).ToString('o')
} | ConvertTo-Json | Set-Content -Path $pidFile -Encoding utf8

$backendReady = Wait-ForUrl -Url 'http://localhost:5000/api/health'
$frontendReady = Wait-ForUrl -Url 'http://localhost:5173/login'

if (-not $backendReady -or -not $frontendReady) {
    Write-Host "Backend log: $(Join-Path $logs 'backend-error.log')"
    Write-Host "Frontend log: $(Join-Path $logs 'frontend-error.log')"
    throw 'One or more services did not become ready.'
}

Write-Host ''
Write-Host 'S-COURT is ready.'
Write-Host 'Frontend: http://localhost:5173'
Write-Host 'Backend:  http://localhost:5000'
Write-Host 'Swagger:  http://localhost:5000/swagger'
