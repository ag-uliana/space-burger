## ⚠️ **Note:** The project is currently in the process of being adapted to work fully locally. Originally, it fetched data from an external API, but now the data is being moved to local JSON files for offline use and portfolio purposes. 

# 🚀 Space Burger 
A modern React + TypeScript application for building and ordering custom space-themed burgers.
This project demonstrates advanced frontend development techniques including dynamic UI composition, real-time WebSocket data, and clean architectural patterns using Redux Toolkit.  
Users can drag-and-drop ingredients to build their custom burger, view live order feeds and oreder history. This project mimics a production-level frontend architecture and is built with scalability and testability in mind.  
https://ag-uliana.github.io/space-burger/

![alt text](public/space-burger-demo.gif)

## 🧰 Tech Stack
### Frontend
React – Component-based architecture for scalable UI  
TypeScript – Strong typing and safer code refactoring  
Redux Toolkit – Scalable and structured state management  
React Router DOM – Declarative routing system  
SCSS Modules – Locally scoped and maintainable styles  
Drag-and-Drop – Custom burger constructor with reorderable elements  
i18next – Runtime language switching and translation management
### Backend Integration
REST API  WebSocket (live order feed)  
### Testing & Quality
Vitest – Unit testing framework  
React Testing Library – Component and DOM interaction testing  
ESLint + Prettier – Code linting and formatting for consistency  
### Tooling
Vite, GitHub Actions

## ✨ Key Features
**Drag-and-Drop** Burger Constructor: Intuitive interface allowing users to build custom burgers with real-time ingredient updates  
**Order System** Submit your burger, get a real order number, and see it processed live.
**Live Order Feed:** Real-time updates of incoming orders via WebSocket, demonstrating proficiency in handling asynchronous data streams.  
**Multilanguage Support:** Full language switcher implementation (English / Russian).  
**User Authentication:** Secure login and registration system with token-based authentication.  
**Test Coverage** Key features covered by unit and integration tests.

### 🚀 Getting Started
Prerequisites  
```
Node.js >= 14.x  
npm or yarn  
```

Installation  
```
git clone https://github.com/ag-uliana/space-burger.git
cd space-burger
npm install
npm start
``` 
Running Tests  
```
npm test
```