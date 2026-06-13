FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY BE/Directory.Build.props BE/
COPY BE/SCourt.sln BE/
COPY BE/src/API/SCourt.API.csproj BE/src/API/
COPY BE/src/BuildingBlocks/SCourt.BuildingBlocks.csproj BE/src/BuildingBlocks/
COPY BE/src/Modules/SCourt.Modules.csproj BE/src/Modules/
COPY BE/tests/ArchitectureTests/SCourt.ArchitectureTests.csproj BE/tests/ArchitectureTests/
COPY BE/tests/IntegrationTests/SCourt.IntegrationTests.csproj BE/tests/IntegrationTests/
COPY BE/tests/UnitTests/SCourt.UnitTests.csproj BE/tests/UnitTests/

RUN dotnet restore BE/SCourt.sln

COPY BE/ BE/

RUN dotnet publish BE/src/API/SCourt.API.csproj \
    --configuration Release \
    --output /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Development

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "SCourt.API.dll"]
