# React Native Working with Data Lab: Ice Cream Parlor

You’ve just joined a mobile development team working on an Ice Cream Flavors application. The previous developer left with incomplete data management functionality, causing poor performance and connectivity issues for users.

The application has a solid UI foundation, but the data layer is fragmented. Some utility functions are implemented, others are missing, and the caching system is non-functional. Your task is to complete the data management architecture and restore the app’s performance.

In this project, you will practice your knowledge of React Native data management by fixing and implementing the missing pieces. You’ll need to:

- organize storage keys using centralized key management and namespaced identifiers
- implement caching utilities with expiration handling using AsyncStorage
- create network utilities with retry logic and error handling
- integrate data services that combine network requests with caching strategies

Before you start coding, look at the files currently in the workspace. The project includes:

App.tsx: Main application component where you’ll integrate all data functionality
src/components/: Folder containing reusable UI components
src/constants/: Folder for centralized constants and storage keys
src/utils/: Folder for utility functions like caching and network helpers
src/services/: Folder for API and data service functions
src/types/: Folder for TypeScript type definitions

Let’s get started!
