$showcase = Get-Content -Raw (Join-Path $PSScriptRoot '..\showcase.js')

if ($showcase -match 'equipment-pin|<figcaption>') {
  throw 'Removed MIM photo copy is still present.'
}

$profileStart = $showcase.IndexOf('<section class="home-about" id="home-profile"')
$heroStart = $showcase.IndexOf('<section class="portfolio-hero"')
$selectedStart = $showcase.IndexOf('<section class="selected-work"')
if ($profileStart -lt 0 -or $profileStart -gt $heroStart -or $profileStart -gt $selectedStart) {
  throw 'The profile must be the first homepage section.'
}

if ($showcase -notmatch 'class="contact-email"') {
  throw 'The profile email link is missing.'
}

Write-Output 'Homepage content checks passed.'
