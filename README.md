# 🏏 Cricket Scorer App

A modern **Cricket Scoring Web Application** built using **React (Vite)** that allows users to score a cricket match ball-by-ball with proper innings logic, wickets, overs, run rate calculations, and match result handling.

This project focuses on **real cricket rules**, clean UI, and structured state management.

---

## 🚀 Live Demo
👉 *(Will be added after deployment)*

---

## ✨ Features

- 🏏 Ball-by-ball scoring
- 🔄 Automatic strike rotation
- 🎯 Target calculation for second innings
- 📊 Current Run Rate (CRR) & Required Run Rate (RRR)
- ❌ Wicket handling with new batsman input
- 🚫 Input validation (empty & duplicate players prevented)
- ⏱️ Over completion & innings end logic
- 🏆 Automatic match result declaration
- 🎨 Clean glassmorphism UI

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** CSS, Bootstrap
- **State Management:** React Hooks
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

cricket-scorer-app/
│
├── public/
│
├── src/
│ ├── assets/
│ │ └── Images/
│ ├── Components/
│ │ ├── CustomDropdown.jsx
│ │ └── ScoreBoard.jsx
│ ├── hooks/
│ │ └── useFormValidation.js
│ ├── pages/
│ │ ├── LandingPage.jsx
│ │ ├── MatchForm.jsx
│ │ └── ScorerPage.jsx
│ ├── styles/
│ │ ├── landingPage.css
│ │ ├── matchForm.css
│ │ ├── scoreBoard.css
│ │ └── scorer.css
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md