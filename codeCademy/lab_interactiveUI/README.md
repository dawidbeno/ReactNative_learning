# Interactive UI 
Codecademy is ready to launch its merch store, and you’ve been brought on to build the mobile storefront. As a fledgling mobile developer, this is your chance to create an app that lets fellow learners browse exclusive Codecademy gear, search for their favorite items, and manage their shopping cart, all from their phones.

In this project, you’ll use React Native to bring the Codecademy Store to life. You’ll implement features that allow users to:

- view all available merch items
- filter products (for example, to show only items on sale)
- search for specific products
- add items to their cart
- view and manage their shopping cart

## Update SDK
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
