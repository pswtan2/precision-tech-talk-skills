$ErrorActionPreference = "Stop"

$packageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$skillRoot = Join-Path $env:USERPROFILE ".codex\skills"
$skillNames = @("precision-tech-talk-setup", "precision-tech-talk-video", "precision-tech-talk-audio")

New-Item -ItemType Directory -Force -Path $skillRoot | Out-Null

foreach ($skillName in $skillNames) {
    $source = Join-Path $packageRoot $skillName
    $destination = Join-Path $skillRoot $skillName

    if (-not (Test-Path -LiteralPath $source)) {
        throw "Missing skill folder: $source"
    }
    if (Test-Path -LiteralPath $destination) {
        throw "Refusing to overwrite installed skill: $destination"
    }

    Copy-Item -LiteralPath $source -Destination $destination -Recurse
    Write-Output "Installed: $skillName"
}

Write-Output "Restart Codex or start a new task to refresh the skill list."
