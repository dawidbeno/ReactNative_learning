# CodeCademy React Native
React Native course from CodeCademy portal.

## Update SDK
When downloaded project which does not work on Expo Go due to old SDK version.

```bash
# 1. Remove everything
rm -rf node_modules package-lock.json

# 2. Install expo with legacy flag
npm install expo@~54.0.0 --legacy-peer-deps

# 3. Update all expo packages
npx expo install --fix -- --legacy-peer-deps

# 4. Clear cache and start
npx expo start -c
```

## autostart development build
If app start automatically as a development build, check for packages which force it to do so. E.g.:
```json
"expo-dev-client": "~5.2.4"
```
`expo-dev-client` is the package that forces your app to use development builds instead of Expo Go. When this package is installed, Expo automatically assumes you want to use a custom development build.
Uninstall it:
```bash
npm uninstall expo-dev-client
```
