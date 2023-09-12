# Project: MoveInLo!
> SC2006 Software Engineering [SCSX Codecrafters]

## Our Project
This project is for an mobile application for MoveInLo! 

## Set-up Guide for New Users

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
npx expo start
```

Starting Development Server (Mobile)
```
npx expo start --tunnel
```

### File Folder Structure
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


