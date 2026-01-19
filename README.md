# Gauss Academy Client

![Project Type](https://img.shields.io/badge/project_type-portfolio_demo-3b82f6) ![Tech Stack](https://img.shields.io/badge/stack-React_19_%7C_Vite_%7C_MUI_v7-007FFF?logo=react&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-blue)

A modern educational platform frontend built with React 19 and Vite, featuring comprehensive course management, user enrollment flows, and role-based administration. This application serves as the client-side interface for Gauss Academy.

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=netlify&logoColor=white)](https://gauss-academy.netlify.app/) [![Backend Repo](https://img.shields.io/badge/Backend-Repo-blue?style=for-the-badge&logo=github)](https://github.com/CarlosCanet/gauss-academy-server) [![Report Issue](https://img.shields.io/badge/Report-Issue-red?style=for-the-badge&logo=github)](https://github.com/CarlosCanet/gauss-academy-client/issues)

## 🎯 Project Overview

Gauss Academy is designed to streamline the educational experience for students, teachers, and administrators. It provides a centralized hub where students can discover and enroll in courses, while administrators manage the academic curriculum.

The platform distinguishes itself with a clean, responsive interface powered by Material UI v7, ensuring a seamless experience across devices. It manages complex flows such as secure course purchasing, real-time class scheduling updates, and varying access levels depending on user roles.

### Project Context

This application is a **Technical Proof of Concept** created for portfolio purposes. Inspired by my former business, *Academia Gauss*, it showcases how I would architect and build a modern educational platform today, applying current best practices in full-stack development.

### ✨ Features

- 🔐 **Role-Based Authentication**: Secure login and signup with distinct access for Students, Teachers, Staff, and Admins.
- 📚 **Course Catalog**: Publicly accessible course listings with detailed information (curriculum, dates, pricing).
- 🛒 **Enrollment & Payments**: Integrated checkout flow using Stripe for secure course purchases.
- 👤 **User Profiles**: Personalized dashboards for students to track their enrolled courses ("My Courses") and update profile details.
- 👮 **Admin Dashboard**: Dedicated tools for creating new courses, managing user roles, and overseeing platform activity.
- 📅 **Class Management**: Detailed schedulers and class lists associated with specific courses.
- 🖼️ **Media Integration**: Cloudinary integration for handling high-quality user avatars and course imagery.
- 🚨 **Error Monitoring**: Real-time error tracking and performance monitoring with Sentry.

### 🗄️ Database Schema

- **User**: Stores authentication, role (Student, Teacher, Staff, Admin) and profile details.
- **Course**: Manages curriculum, schedule, pricing and teacher assignments.
- **CourseClass**: Represents individual daily sessions linked to courses.
- **Enrollment**: Tracks student purchases and active course access.
- **Teacher**: Extends User with professional bio and course history.

### ↕️ Key Workflows

- **Student Journey:** Browse courses → Sign up → Enroll → Access content.  
- **Admin Journey:** Create courses → Manage users → Monitor activity.

## 🛠️ Tech Stack & Decisions

This project leverages the latest ecosystem advancements to ensure performance and developer experience:

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![MUI](https://img.shields.io/badge/Material--UI_v7-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) ![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)

### Core Framework Choices

**React 19 & Vite**
- Utilizes the latest React concurrent features.
- Blazing fast HMR (Hot Module Replacement) and build times with Vite.

**Material UI (MUI) v7**
- Implements a robust design system with pre-built, accessible components.
- Uses `@emotion` for performant CSS-in-JS styling.
- Responsive design via `ResponsiveAppBar` and grid layouts.
- Data presentation handled by `@mui/x-data-grid` for administrative tables.

**React Router v7**
- Manages complex client-side routing.
- Protected route wrappers (`OnlyAdmin`, `OnlyRegistered`) for security.

**Stripe & Cloudinary**
- Offloads complex payment processing and media management to specialized third-party services.
- Ensures PCI compliance and optimized asset delivery.

## 🏗️ Architecture & Design Principles

The code adheres to high-quality software engineering standards to ensure maintainability, scalability, and code health:

- **SOLID Principles**: Ensuring modular and testable component architecture.
- **KISS & DRY**: Keeping logic simple and avoiding duplication, especially in services and hooks.
- **Clean Code**: Meaningful naming conventions, small functions, and self-documenting code.
- **Component-Based**: Leveraging React's composition model and MUI's customizable components.
- **Responsive Design**: Ensuring functional layouts across devices using MUI's Grid system and breakpoints.

## 🤖 AI-Assisted Development

This project was developed leveraging modern AI-powered development tools:

- **GitHub Copilot**: Code generation, autocompletion, and refactoring assistance throughout the development process.
- **MCP (Model Context Protocol)**: Integration with external tools (GitHub, MUI, Context7) to provide rich context to the AI assistant.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (recommended)

### Installation

1. Clone the repository
```bash
git clone https://github.com/YourOrg/gauss-academy-client.git
cd gauss-academy-client
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Ensure all VITE_* variables are correctly set.

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

### Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```
