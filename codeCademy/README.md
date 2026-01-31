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