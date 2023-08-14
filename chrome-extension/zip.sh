# Extract version from manifest.json
version=$(grep -Eo '"version"\s*:\s*"[^"]*"' manifest.json | grep -Eo '[0-9]+(\.[0-9]+)*')

# Zip dist folder with version from manifest.json
zip -r "dist/liveroom_chrome_extension_$version.zip" dist/*
