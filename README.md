# Project: MoveInLo!
> SC2006 Software Engineering [SCSX Codecrafters]

## Our Project
This project is for an mobile application for MoveInLo! 

<hr>

## Set-up Guide for New Developers

Navigate to the project directory
```
cd /MoveInLo
```

Install dependency packages
```
npm install
```

Starting Development Server
```
npx expo start --clear
```

Starting Development Server (To index on mobile)
> Note: You will need to install expo on your mobile device to use this feature.
```
npx expo start --tunnel
```
Using an emulator (Download ios/ android emulator)
> Note: You will need to have an ios or android emulator to use this feature. Verify that your simulator is functioning as expected.
```
npx expo start --ios
npx expo start --android
```

View this link for guide on [Expo Setup](https://docs.expo.dev/workflow/ios-simulator/#expo-cli-is-printing-an-error-message-about-xcrun-what-do-i-do).

<hr>

## File Folder Structure
We adopted the best practice for file folder structure, adhering to `Container-Component` pattern. 
This allows us to achieve the following benefits: 
1. **Separation of Concerns**
   - By separating the logic and presentation, the pattern improves code maintainability and readability.
   - Containers handle complex logic, while Components focus on rendering UI elements, making it easier to understand and modify individual parts of the codebase.
2. **Reusability**
   - The Container-Component pattern encourages code reuse. 
   - Containers can be reused across multiple Components, allowing developers to leverage the same logic in different parts of the application.
3. **Testability**
   - Containers, being responsible for the business logic, can be easily unit tested in isolation. This facilitates testing and ensures that the logic is functioning correctly, enhancing the stability of the application.
4. **Collaboration**
   - Developers can work on different parts of the application simultaneously and independently.

### Structure:
- `src/api`: API resources
- `src/app`: Expo File-folder Routing  
- `src/assets`: Images, fonts, and other static resources 
- `src/screens`: Individual application screens 
- `src/component`: Reusable UI components

## Developer Guide
For frontend routing convention, we will adhere by the following standards for readability 
and adherence to the Expo best practices.
- Create a `_layout.js` and `index.js` for each page.
- Nested routes can be accessed using the following convention, with each nested route being a directory.
  - `customer/schedule/scheduler`
