# 💸 Digital Wallet Management System

A **role-based digital wallet application** with secure authentication, smooth user experience, and separate dashboards for **Users**, **Agents**, and **Admins**. Built with a modern tech stack, this project simulates a real-world e-wallet service.

---

## 📖 Project Overview

This system demonstrates **role-based access control, authentication, and advanced UI/UX practices**. It supports:

- **Users** – Manage wallets, send/receive funds, view transaction history.
- **Agents** – Perform cash-in/out for users, track commissions, and manage profiles.
- **Admins** – Oversee the entire system, manage users/agents, transactions, and apply system-wide settings.

The project is fully **responsive, accessible, and production-ready**, featuring skeleton loaders, toast notifications, guided tours, and polished UI transitions.

---

## 🌍 Public Landing Section (No Login Required)

- **Home Page** – Theme-colored navigation bar (sticky), hero banner, footer, smooth transitions, responsive design, skeleton loaders for delays.
- **About Page** – Service story, mission, and team details.
- **Features Page** – List of features with visuals/icons.
- **Contact Page** – Inquiry form (simulated submission).
- **FAQ Page** – Common questions & answers.

---

## 🔐 Authentication

- JWT-based login & registration with role selection (**User** or **Agent**).
- Role-based redirection after login.
- Persisted authentication state across refresh.
- Secure logout functionality.

---

## 👤 User Dashboard

- Wallet overview: balance, quick actions, recent transactions.
- Deposit (cash-in simulation via agent).
- Withdraw money.
- Send money (search by phone/email).
- Transaction history with:
  - Pagination
  - Filtering by type/date range
- Profile management: update name, phone, password.

---

## 🧑‍💼 Agent Dashboard

- Overview: cash-in/out summary, recent activity.
- Add money to user wallets.
- Withdraw money from user wallets.
- View all agent-handled transactions.
- Commission history (optional).
- Profile management: update info, password.

---

## 🛠️ Admin Dashboard

- Overview: total users, agents, transactions, and system volume.
- Manage users: view, block/unblock.
- Manage agents: approve/suspend.
- View all transactions with:
  - Advanced filters
  - Search by category, status, amount, etc.
  - Pagination
- Adjust system fees/limits (optional).
- Profile management.

---

## ⚡ General Features

- **Role-based navigation menus** – unique for Users, Agents, Admins.
- **Loading indicators & global error handling**.
- **Form validations** – required fields, numeric checks, positive amounts.
- **Advanced filtering** on transactions and lists.
- **Pagination** for long records.
- **Dynamic data visualization** – cards, bar charts, pie charts, and tables.
- **Toast notifications** – real-time success/error feedback.
- **Guided Tour** (driver.js / shepherd.js / react-joyride):
  - At least 5 steps (menu, dashboard cards, charts, filters, theme toggle).
  - Runs once for new users (via `localStorage`).
  - Restart tour option in Settings.
- **Tooltip styling & UX improvements**.

---

## 🎨 UI/UX Considerations

- Fully responsive for **mobile, tablet, and desktop**.
- Consistent margins, spacing, and typography.
- Accessible color themes (light/dark mode).
- Performance optimized with **lazy loading & skeleton loaders**.
- No placeholder text – uses real or realistic data.
- Meets accessibility standards.

---

## 🛠️ Technology Stack

**Frontend:**

- React + Vite
- Redux Toolkit
- Tailwind CSS + Shadcn/UI
- Axios
- React Router

**Backend:**

- Node.js
- Express.js
- Mongoose (MongoDB ODM)

**Authentication:**

- JWT + HttpOnly Cookies

**Deployment:**

- Vercel (Frontend)
- Vercel (Backend)
- MongoDB Atlas (Database)

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (>=18)
- MongoDB (>=6.0)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/abujayed007/Deshi-Wallet-client
cd Deshi-Wallet-client

# Install client dependencies
cd Deshi-Wallet-client
npm install

# Install server dependencies
git clone https://github.com/abujayed007/Assignment-5
cd Assignment-5
npm install
```
