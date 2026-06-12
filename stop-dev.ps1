$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$pidFile = Join-Path $root '.runtime\dev-processes.json'
$ports = 5000, 5173
$stopped = @()

if (Test-Path $pidFile) {
    $saved = Get-Content $pidFile -Raw | ConvertFrom-Json
    foreach ($processId in @($saved.backendPid, $saved.frontendPid)) {
        if ($processId -and (Get-Process -Id $processId -ErrorAction SilentlyContinue)) {
            Stop-Process -Id $processId -Force
            $stopped += $processId
        }
    }
}

foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    foreach ($connection in $connections) {
        if ($connection.OwningProcess -and $connection.OwningProcess -notin $stopped) {
            Stop-Process -Id $connection.OwningProcess -Force -ErrorAction SilentlyContinue
            $stopped += $connection.OwningProcess
        }
    }
}

Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
Write-Host "Stopped S-COURT development services: $($stopped -join ', ')"
