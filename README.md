# Library Management System

A website that simulates the librarians's/administrator's system interface at any library.

## Features
- Book management: Administrators can view, sort, and search books by title, author, and genre. They can add, edit, and delete books from the system.
- Member management: Administrators can manage members, including adding, editing, and deleting member records. They can also view each member's current transactions.
- Transactions: Administrators can add, edit, and delete transactions. Members are limited to borrowing a maximum of three books at a time.

## Technologies used:
### Frontend: 
- [Bootstrap](https://getbootstrap.com/) for styling
- [lit-html](https://lit.dev/docs/v1/lit-html/introduction/) for certain templates
- [jQuery](https://jquery.com/) for form handling
- [axios](https://www.npmjs.com/package/axios) for most HTTP requests
- [htmx](https://htmx.org/) for simpler HTTP requests, such as POST

### Backend:
- Node.js with Express.js for server side logic

### Database:
- MongoDB

## Installation

1. Clone the repo
2. Run ```npm install``` to install all dependencies.
3. The project will be started with nodemon on entering ```npm start```, at default port 5000.
