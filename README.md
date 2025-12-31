# Interactive Quiz App

A full-stack interactive quiz application built using React, Node.js, Express, and MongoDB.
The app allows authenticated users to take timed quizzes across multiple domains, view detailed results, and track their past quiz records.

---

## Key Features

### User Authentication
- Secure login and registration system
- User credentials are stored safely in the database
- Each user has access to their own quiz history

---

### Domain-Based Quizzes
Users can choose a quiz domain from the following categories:
- Cinema
- History
- Sports
- General Knowledge (GK)

---

### Quiz Experience
- Each quiz consists of 15 multiple-choice questions
- A timer is enabled for every question
- Users must submit the quiz to view results

---

### Detailed Results & Analytics
After submission, the result page displays:
- Total score
- Time spent on each question
- Whether each answer was correct or incorrect

All quiz data is stored in the database.

---

### Previous Records
- Users can view their past quiz attempts
- Accessible directly from the domain selection page
- Enables performance tracking over time

---

## Tech Stack

Frontend:
- React
- JavaScript
- HTML
- CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

---

## 📁 Project Structure
```
interactive-quiz-app/
│
├── quiz_backend/
│ ├── middleware/
│ │ └── auth.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Question.js
│ │ └── Score.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── questions.js
│ │ └── scores.js
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
│
├── quiz_frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── DomainPage.jsx
│ │ │ ├── LoginPage.jsx
│ │ │ ├── RegisterPage.jsx
│ │ │ ├── QuizPage.jsx
│ │ │ ├── ResultPage.jsx
│ │ │ └── RecordsPage.jsx
│ │ ├── components/
│ │ │ └── Header.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## How to Run the Project Locally

Backend Setup:
```
cd quiz_backend
npm install
npm start
```
Frontend Setup:
```
cd quiz_frontend
npm install
npm run dev
```

---

## Environment Variables

Create a .env file inside quiz_backend and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Note: .env is ignored from GitHub for security reasons.

---

## Future Enhancements
- Leaderboard system
- Difficulty levels
- More quiz domains
- Improved UI/UX and animations

---

## Author
Praakruthi PS
 

