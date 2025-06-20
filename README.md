# Digital Voting Backend

This is the backend server for the Digital Voting System built using Node.js, Express.js, MongoDB and Cloudinary.

## 🔖 Author
# **Abhishek Singh**  
# Vellore Institute of Technology, Chennai

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Cloudinary (Document Storage)
- Multer (File Uploads)
- CORS
- dotenv

## 🔐 Features

- Voter Registration with document upload
- Admin Registration
- Login (Voter/Admin) using JWT-based authentication
- Secure document storage in Cloudinary
- Voting and Candidate Management
- Protected routes for admin and voters

---

## 🔧 Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/abhishek-7-singh/digital-voting-backend.git
cd digital-voting-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the root directory and add:

```env
MONGO_URI=your-mongodb-uri
PORT=7001
JWT_SECRET=your-secret-key

NODE_ENV=development

CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 4️⃣ Run Locally
```bash
npm run dev
```

Backend runs on: **http://localhost:7001/**

## 🚀 Deployment
Backend deployed on Render:  
**https://digital-voting-backend.onrender.com**

## 📁 Project Structure
```
.
├── config/         # Database configuration
├── controllers/    # Route logic
├── middleware/     # Error & Auth middlewares
├── models/         # Mongoose models
├── routes/         # Express routes
├── utils/          # Utility functions
├── server.js       # Main server file
└── .env           # Environment variables
```
