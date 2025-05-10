# 🛍️ QuamStore – Serverless E-Commerce Platform

QuamStore is a fully serverless e-commerce web app built with **React**, **Vite**, and **CSS** on the frontend, and **AWS Lambda**, **API Gateway**, and **DynamoDB** on the backend. The app allows users to browse products, manage a shopping cart, sign up, log in, and simulate checkouts — all backed by a cloud-native architecture.

## 📦 Features

- 🧾 Browse products by category (from [Fake Store API](https://fakestoreapi.com/))
- 🛒 Add/remove items from cart
- 💾 Persist cart + order history per user using DynamoDB
- 👤 Simulated user login/signup
- 💳 Simulated checkout flow
- 🎨 Responsive, dark-mode-friendly UI
- ✅ Cloud-native backend with logging and data storage

## 🧩 Tech Stack

| Frontend                | Backend                        | Cloud Infra            |
|-------------------------|--------------------------------|-------------------------|
| React + Vite            | AWS Lambda (6 functions)       | API Gateway (6 routes) |
| React Router DOM        | AWS SDK (DynamoDBClient)       | DynamoDB               |
| Toastify, Icons         | CORS support + JSON parsing    | Amplify Hosting        |

---

## 📂 AWS Lambda Functions

| Lambda Function     | Purpose                         |
|---------------------|----------------------------------|
| `logAddToCart`      | Store cart item to DynamoDB     |
| `logRemoveFromCart` | Remove cart item from DynamoDB  |
| `getCart`           | Fetch cart items for user       |
| `logCheckout`       | Move cart to order history      |
| `signupUser`        | Simulate user account creation  |
| `loginUser`         | Simulate login + return user ID |

---

## 🌍 API Gateway Routes

Each route is a POST endpoint linked to a Lambda:

| Route             | Lambda Handler       |
|------------------|----------------------|
| `/cart/add`       | `logAddToCart`       |
| `/cart/remove`    | `logRemoveFromCart`  |
| `/getCart`        | `getCart`            |
| `/checkout`       | `logCheckout`        |
| `/signup`         | `signupUser`         |
| `/login`          | `loginUser`          |

---

## 👨‍💻 Author

**Parhuam Jalalian** — CS Graduate @ SJSU  
Contact: parhuam.jalalian@sjsu.edu  

