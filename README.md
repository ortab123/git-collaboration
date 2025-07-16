# 📇 Contact Manager - Pair Exercise

**Created by:** Marat Zinger & Or Tabibian  
**Project Type:** CLI Application  
**Focus:** Error handling, modular design, and file operations in Node.js

---

## 📋 Description

This is a command-line Contact Manager application built with Node.js.  
The project was developed as a pair exercise to practice:

- Error handling fundamentals
- Input validation
- File reading/writing with JSON
- Modular project structure
- User-friendly CLI interaction

The app allows you to add, list, search, and delete contacts, with meaningful error messages and robust recovery from common issues like missing or corrupted files.

---

## 🚀 Supported Commands

```bash
node contacts.js add "name" "email" "phone"
node contacts.js list
node contacts.js search "query"
node contacts.js delete "email"
node contacts.js help
```

---

## 📁 Project Structure

```bash
contact-manager/
├── utils/
│   ├── validation.js         # Input validation logic
│   └── fileUtils.js          # File read/write utilities with error handling
├── services/
│   └── contactService.js     # Contact business logic (add, delete, search, list)
├── commands/
│   └── commandHandler.js     # Maps CLI commands to service functions
└── app.js                    # Entry point, parses arguments, runs commands
```

## 🛠 Technologies Used
 - Node.js (no external libraries)
 - JavaScript ES6+
 - JSON file storage

## 🔐 Error Handling Features
Graceful handling of:
 - Invalid or missing arguments
 - Non-existing files
 - Corrupted JSON
 - Attempt to add duplicate email
 - Clear and consistent error messages
