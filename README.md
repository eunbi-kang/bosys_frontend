# Book-Order System(bosys) : Frontend

## 📚 Book Order System
A book order management system built with **Redux**, **Django REST Framework (DRF)**, and **Spring Boot**.

---

## 🚀 Tech Stack
- **Frontend**: Redux, React (or any preferred frontend framework)
- **Backend**: Django REST Framework (DRF), Spring Boot
- **Database**: PostgreSQL / MySQL
- **API Architecture**: RESTful API

---

## 🎯 Features
- 📖 **Book Order Management**: Users can place, track, and manage book orders.
- 🛒 **Shopping Cart**: Users can add books to their cart before checkout.
- 🔍 **Search & Filter**: Find books by title, author, or category.
- 📦 **Order Tracking**: Track order status (Pending, Shipped, Delivered, etc.).
- 👤 **User Authentication**: Secure login and user management.
- 📊 **Admin Dashboard**: Manage books, orders, and user activities.

---

## 🛠️ Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/eunbi-kang/bosys.git
cd bosys
```

### 2️⃣ Backend Setup (Django + Spring Boot)
#### Django (DRF) Setup
```bash
cd backend/django
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Spring Boot Setup
```bash
cd backend/springboot
./mvnw spring-boot:run
```

### 3️⃣ Frontend Setup (React + Redux)
```bash
cd frontend
npm install
npm start
```

---

## 📌 API Documentation
API documentation will be available at:
- **Django DRF**: `http://localhost:8000/api/docs/`
- **Spring Boot**: `http://localhost:8080/swagger-ui/`

---

🚀 **Happy Coding!**

