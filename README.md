# 🍽️ Olive Restaurant Frontend

A modern React application for browsing restaurant menus, placing orders, and tracking deliveries.

---

# Project Overview

The Olive Restaurant Frontend provides customers with a simple and responsive interface for ordering food online.

Built using React and Tailwind CSS, the application communicates with a Django REST Framework backend.

---

## Features

### Customers can

* Browse restaurant menu
* View food categories
* Add items to cart
* Update cart quantities
* Checkout
* Select payment method
* Track order status
* Responsive user interface

---

## Tech Stack

* React
* Vite
* React Router
* Tailwind CSS
* Axios
* Context API
* Docker

---

## Project Structure

```text
src/
│
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
│     ├── Home
│     ├── Menu
│     ├── Cart
│     ├── Checkout
│     └── OrderTracking
│
├── services/
├── App.jsx
└── main.jsx
```

---

## Pages

* Home
* Menu
* Cart
* Checkout
* Order Tracking

---

## Installation

Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/olive-restaurant-frontend.git
```

Navigate into project

```bash
cd olive-restaurant-frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Application runs at

```
http://localhost:5173
```

---

## Build Production Version

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## Docker

Build image

```bash
docker build -t olive-frontend .
```

Run container

```bash
docker run -p 5173:5173 olive-frontend
```

---

## Backend Connection

Default API

```
http://localhost:8000/api/
```

The frontend communicates with the Django REST API for:

* Categories
* Menu Items
* Orders
* Order Tracking

---

## State Management

The project uses React Context API to manage:

* Shopping Cart
* Cart Items
* Total Price
* Checkout Data

---

## GitHub Actions

Continuous Integration automatically:

* Installs dependencies
* Builds the React application
* Validates production build

---

## Future Improvements

* User Authentication
* User Profiles
* Favorite Foods
* Search
* Filtering
* Payment Gateway Integration
* Push Notifications
* Dark Mode
* Online Delivery Tracking

---

## Author

Kelvin Tullo

---

## License

Developed for educational and portfolio purposes.
