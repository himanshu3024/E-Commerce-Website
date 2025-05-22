# 🛒 Scalable E-Commerce Website on Azure

A full-stack e-commerce website built with **Node.js**, **Azure SQL Database**, and hosted using **Azure App Services**. This project showcases cloud deployment, RESTful API design, and scalable architecture on Microsoft Azure.

## 🔧 Project Overview

This e-commerce platform includes the following features:

- **Product Catalog**: Browse available products.
- **Shopping Cart**: Add and manage items for purchase.
- **User Interface**: Frontend for user interaction (React planned).
- **Backend REST APIs**: Handle business logic and data operations.
- **Azure Infrastructure**: Scalable cloud hosting with Azure services.

## 🚀 Technologies Used

| **Stack**    | **Tools/Services**                     |
|--------------|----------------------------------------|
| **Frontend** | HTML, CSS, JavaScript (React planned)   |
| **Backend**  | Node.js, Express                       |
| **Database** | Azure SQL Database, `mssql` npm package|
| **Cloud**    | Azure App Service, Azure SQL, Static Web Apps (planned), Azure CDN (planned), Azure Load Balancer (optional) |
| **Dev Tools**| Postman, VS Code, GitHub, Azure CLI    |

## 🧱 Architecture

Frontend (Static HTML/React) ↓ Azure Static Web Apps (planned) ↓ Backend (Node.js + Express) ↓ Azure App Service (Deployed) ↓ Azure SQL Database (Live DB)


## 🗂️ Folder Structure

E-Commerce-Website/ ├── backend/ │ ├── app.js │ ├── routes/ │ │ ├── products.js │ │ └── cart.js │ ├── .env │ └── package.json └── frontend/ (Coming soon) ├── index.html ├── products.html ├── cart.html ├── script.js └── style.css


## 📌 Features Implemented

### Backend API
- RESTful API built with Express.
- Routes: `/api/products`, `/api/cart`.
- Secure configuration using `.env` file.
- Tested locally and with Postman.

### Azure SQL Database
- Tables: `Products`, `CartItems`.
- Sample data inserted and integrated with APIs.
- Connected via Azure connection string.

### Git & Version Control
- Managed with Git and hosted on GitHub.
- Resolved `master/main` branching issues.

## 🛠️ Next Steps (Planned)

- [x] Deploy backend on Azure App Service (in progress).
- [ ] Deploy frontend using Azure Static Web Apps.
- [ ] Add Azure CDN for performance optimization.
- [ ] Set up Azure Load Balancer for autoscaling (optional).

## 📬 Author

**Himanshu Gandhi**  
- Postgraduate student, Project Management – Fleming College  
- [LinkedIn](https://www.linkedin.com/in/himanshu-gandhi-891204160/)

## ⭐ Showcase This Project

- **Live Demo**: Coming soon after deployment.
- **GitHub Repository**:(https://github.com/himanshu3024/E-Commerce-Website)
