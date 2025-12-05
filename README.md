# GamerMatch UI – Angular Frontend

This repository contains the **Angular frontend** for the GamerMatch application.  
The UI allows users to create, browse, update, and delete GamerMatch profiles using the shared project API.

**Branch:** `main`

---

## Required Tools

To run this project locally, you must have the following installed:

- Node.js  
- npm  
- Angular CLI  
- Docker Desktop  

The backend API and database **must be running before starting the UI**.

---

## How to Run the Application

You must run the components in this order:

1. **Database (Docker)**
2. **API Backend**
3. **Angular UI**

---

## Step 1: Start the Database (Docker)

The database Docker setup and instructions are located in the main project repository:

**Database Instructions (README):**  
https://github.com/WSU-kduncan/cs4900-m-e-w-industries/tree/main/DatabaseDesign#readme

Follow the commands in that README to start the database using Docker.

**The database must be running before starting the API.**

---

## Step 2: Start the API Backend

The API is maintained in a separate repository:

**API Repository & README:**  
https://github.com/WSU-kduncan/cs4900-api-m-e-w-industries

Follow the commands in the API README to:

- Pull from the correct branch  
- Start the Spring Boot application  
- Connect to the running database  

---

## Step 3: Run the Angular UI

Start the UI with:

```bash
ng serve --proxy-config proxy.conf.json
```
## Step 4: Open the application in your browser at:

http://localhost:4200/

## User Dashboard

This is the main page of the app, it displays all the users in the database in a list.
If you scroll to the bottom, you will find three forms:

### Add User

- Fill in all fields and click "Add User" button to add user to database

![AddUser](./images/addUserForm.png)

- Page will refresh and added user will appear at bottom of list

![AddedUser](./images/addedUser.png)

### Update User

- Fill in all fields and click "Update User" button to update user information

![UpdateUser](./images/updateUserForm.png)

- Page will refresh and user information will be updated

![UpdatedUser](./images/updatedUser.png)

### Delete User

- Fill in user Id number and press delete button
- User profile will be deleted and page will refresh

![DeleteUser](./images/deleteUserForm.png)
