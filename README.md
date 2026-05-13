<h1 align="center"> Audit AI </h1>
<p align="center"> High-Performance AI-Driven SaaS Optimization and Strategic Lead Intelligence Engine </p>

<p align="center">
  <img alt="Build" src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge">
  <img alt="Issues" src="https://img.shields.io/badge/Issues-0%20Open-blue?style=for-the-badge">
  <img alt="Contributions" src="https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge">
</p>

## 🌟 Overview

**Audit AI** is a sophisticated, full-stack intelligence platform designed to revolutionize how businesses perceive and manage their SaaS ecosystems. By merging the analytical power of Google's Generative AI with a robust TypeScript-driven architecture, Audit AI provides organizations with an automated, high-fidelity audit engine. It doesn't just list tools; it evaluates spend, identifies inefficiencies, and transforms raw operational data into strategic growth opportunities.

---

### The Problem

> Modern enterprises struggle with "SaaS sprawl"—an unmanaged proliferation of software subscriptions that leads to budget leakage, redundant functionality, and security vulnerabilities. Manually auditing these stacks is a labor-intensive process, often resulting in outdated reports and missed optimization opportunities. Furthermore, converting the interest in these audits into high-quality business leads remains a fragmented and inefficient process.

---

### The Solution

---

#### Audit AI eliminates the manual burden of software stack evaluation through a coordinated full-stack architecture:

- **_Interactive Frontend:_** Provides a high-performance React-based interface where users can submit their current software stack for immediate, real-time analysis.

- **_Robust Backend Orchestration:_** Built on Node.js and Express, the server manages the entire data workflow, ensuring seamless communication between the client and the processing engine.

- **_Multi-Layered Security:_** Implements rigorous protection including Zod-based data validation, honeypot anti-spam triggers, and rate limiters to defend against automated abuse and DOS attacks.

- **_AI-Powered Intelligence:_** Leverages the Gemini AI engine to analyze user inputs and generate deep-context summaries that identify cost-saving opportunities and stack optimizations.

- **_Actionable Visualization:_** Delivers a comprehensive Results Dashboard that transforms raw data into immediate business value and clear visual insights.

- **_Lead Optimization:_** Closes the loop by capturing and nurturing high-intent leads through integrated email services and automated lead management systems.

---

### Architecture Overview

---

Built on a **Component-based Architecture** (Frontend) and a **RESTful API** (Backend), ensuring modularity && scalability.

- **Frontend:** A Vite-powered React application focusing on high-performance rendering and a seamless user journey.
- **Backend:** A TypeScript Express server emphasizing type-safe operations, secure middleware integration, and AI service orchestration.

---

## ✨ Key Features

### 🚀 Intelligent Audit Engine

Transform complex software lists into actionable insights. The core engine analyzes SaaS spend and tool utility, providing users with a clear path toward optimization.

- **User Benefit:** Stop wasting budget on redundant tools and identify gaps in your tech stack in seconds.

### 📊 Results Dashboard

A high-fidelity visualization interface that presents audit findings in a clear, professional format. It breaks down complex AI-generated data into digestible metrics.

- **User Benefit:** Gain immediate executive-level clarity on your operational efficiency without sifting through spreadsheets.

### 🛡️ Multi-Layered Security

Audit AI is fortified with enterprise-grade security protocols, including custom rate limiting, honeypot fields to trap malicious bots, and HCaptcha integration.

- **User Benefit:** Ensure your data and the platform remain secure from automated attacks and spam.

### 📧 Automated Lead Nurturing

Integrated lead management systems capture user information via conversion-optimized modals and deliver immediate value through automated email responses.

- **User Benefit:** Seamlessly transition from a casual audit to a deep-dive business relationship with zero manual overhead.

### 🧠 AI-Powered Summaries

Leveraging the `@google/generative-ai` package, the system generates human-like summaries of audit results, providing context that standard algorithmic tools miss.

- **User Benefit:** Receive personalized recommendations that understand the nuance of your specific business needs.

---

## 🛠️ Tech Stack & Architecture

Audit AI utilizes a modern, type-safe stack designed for reliability and developer productivity.

| Technology               | Purpose            | Why it was Chosen                                                                        |
| :----------------------- | :----------------- | :--------------------------------------------------------------------------------------- |
| **TypeScript**           | Primary Language   | Provides robust type safety across the entire stack, reducing runtime errors.            |
| **React**                | Frontend Framework | Enables a reactive, component-based UI for complex state management in the dashboard.    |
| **Express**              | Backend Framework  | A lightweight, flexible Node.js framework ideal for building high-performance REST APIs. |
| **Mongoose**             | Database ODM       | Simplifies data modeling and interaction with MongoDB for audit and lead persistence.    |
| **Google Generative AI** | AI Orchestration   | Harnesses Gemini for advanced natural language processing and audit summarization.       |
| **Zod**                  | Schema Validation  | Ensures 100% data integrity for all incoming API requests and internal configurations.   |
| **Resend**               | Email Service      | Provides reliable, developer-friendly transactional email delivery for lead alerts.      |

---

## 📁 Project Structure

```
vikasingh0897-AuditAI-5c502ca/
├── 📁 frontend/                             # React Client Application
│   ├── 📁 public/                           # Static assets (Logos, Icons)
│   │   ├── 📄 AuditAI-Logo.svg              # Primary Brand Identity
│   │   └── 📄 favIcon.svg                   # Browser favicon
│   ├── 📁 src/                              # Frontend source code
│   │   ├── 📁 components/                   # Shared UI components
│   │   │   ├── 📄 Footer.tsx                # Global footer navigation
│   │   │   └── 📄 Header.tsx                # Global header and brand bar
│   │   ├── 📁 pages/                        # View-level components
│   │   │   ├── 📄 AuditForm.tsx             # SaaS data entry interface
│   │   │   ├── 📄 AuditSummary.tsx          # AI result visualization
│   │   │   ├── 📄 LandingPage.tsx           # Conversion-optimized entry point
│   │   │   ├── 📄 LeadModal.tsx             # Lead capture interface
│   │   │   └── 📄 ResultsDashboard.tsx      # Data visualization hub
│   │   ├── 📄 App.tsx                       # Main application router
│   │   ├── 📄 main.tsx                      # Application entry point
│   │   └── 📄 index.css                     # Global styling
│   ├── 📄 vite.config.ts                    # Vite build configuration
│   └── 📄 package.json                      # Frontend dependencies
│
├── 📁 backend/                              # Node.js Express Server
│   ├── 📁 src/                              # Backend source code
│   │   ├── 📁 controllers/                  # Request handling logic
│   │   │   ├── 📄 audit.controller.ts       # Audit processing logic
│   │   │   ├── 📄 lead.controller.ts        # Lead management logic
│   │   │   └── 📄 pricing.controller.ts     # Pricing data logic
│   │   ├── 📁 middlewares/                  # Express request interceptors
│   │   │   ├── 📄 honeypot.middleware.ts    # Anti-spam security
│   │   │   ├── 📄 rateLimiter.ts            # DOS protection
│   │   │   └── 📄 validator.middleware.ts   # Zod validation logic
│   │   ├── 📁 models/                       # Database schemas
│   │   │   ├── 📄 audit.model.ts            # Audit data structure
│   │   │   └── 📄 pricing.model.ts          # Tool pricing structure
│   │   ├── 📁 routes/                       # API endpoint definitions
│   │   │   ├── 📄 audit.route.ts            # Audit-related endpoints
│   │   │   └── 📄 lead.route.ts             # Lead-related endpoints
│   │   ├── 📁 utils/                        # Shared utility functions
│   │   │   ├── 📄 apiResponse.ts            # Standardized response wrapper
│   │   │   ├── 📄 captcha.ts                # HCaptcha verification
│   │   │   ├── 📄 emailService.ts           # Resend/SMTP integration
│   │   │   └── 📄 summaryEngine.ts          # AI-logic wrapper
│   │   ├── 📄 db.ts                         # Database connection logic
│   │   ├── 📄 app.ts                        # Express app configuration
│   │   └── 📄 index.ts                      # Server entry point
│   ├── 📁 test/                             # Backend testing suite
│   │   └── 📄 auditEngine.test.ts           # Core engine unit tests
│   ├── 📄 jest.config.js                    # Test runner configuration
│   └── 📄 package.json                      # Backend dependencies
│
├── 📄 .env.example                          # Environment template
├── 📄 PRICING_DATA.md                       # Curated SaaS pricing reference
└── 📄 DEVLOG.md                             # Project evolution and updates

```

---

## 🔐 Environment Variables

The application requires several environment variables to function correctly. These should be defined in a `.env` file in the respective directories or at the root level as per your deployment strategy.

| Variable                 | Description                                    | Required |
| :----------------------- | :--------------------------------------------- | :------- |
| `VITE_API_URL`           | Base URL for the backend API (Frontend)        | Yes      |
| `VITE_HCAPTCHA_SITE_KEY` | Site key for HCaptcha integration              | Yes      |
| `MONGO_URI`              | Connection string for MongoDB                  | Yes      |
| `PORT`                   | The port the backend server listens on         | Yes      |
| `BREVO_API_KEY`          | API Key for email service delivery             | Yes      |
| `EMAIL_FROM`             | The sender email address for notifications     | Yes      |
| `SMTP_HOST`              | Host for SMTP fallback services                | Yes      |
| `CLIENT_URL`             | The URL of the frontend application (for CORS) | Yes      |
| `APP_URI`                | The primary application URI                    | Yes      |
| `NODE_ENV`               | Environment state (development/production)     | Yes      |

---

## 🔑 API Keys Setup

### 1. Database Setup (MongoDB)

Audit AI uses Mongoose to interact with MongoDB.

- **Action:** Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Configuration:** Obtain your connection string. Ensure the network access whitelist includes your deployment IP.
- **Environment:** Assign this to `MONGO_URI`.

### 2. Email Service (Resend/Brevo)

Automated lead notifications and audit summaries are delivered via transactional email.

- **Action:** Sign up at [Brevo](https://www.brevo.com/) or [Resend](https://resend.com/).
- **Configuration:** Create an API Key and verify your sending domain.
- **Environment:** Assign the key to `BREVO_API_KEY` and set `EMAIL_FROM`.

### 3. AI Engine (Google Gemini)

The `@google/generative-ai` package requires a valid Google AI SDK key.

- **Action:** Visit the [Google AI Studio](https://aistudio.google.com/).
- **Configuration:** Generate an API Key for Gemini Pro.
- **Environment:** Ensure the backend has access to this key (standardized as a service key in `summaryEngine.ts`).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **TypeScript:** v6.0.3+ (installed via devDependencies)
- **MongoDB:** A running instance or Atlas URI

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/vikasingh0897/AuditAI.git
    cd AuditAI
    ```

2.  **Backend Setup**

    ```bash
    cd backend
    npm install
    cp .env.example .env # Update with your verified API keys
    npm run build
    ```

3.  **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    # Ensure VITE_API_URL in .env points to your local backend
    ```

4.  **Running the Development Environment**
    - **Start Backend:**
      ```bash
      cd backend
      npm run dev
      ```
    - **Start Frontend:**
      ```bash
      cd frontend
      npm run dev
      ```

---

## 🔧 Usage

### Running the Audit

1.  Navigate to the `LandingPage`.
2.  Interact with the `AuditForm` to input your current SaaS tools and estimated monthly spend.
3.  Complete the HCaptcha challenge (verified by `captcha.ts`).
4.  The `summaryEngine.ts` will process the input using Google Generative AI.

### Viewing Results

- Upon completion, you will be redirected to the `ResultsDashboard`.
- The dashboard displays a high-level `AuditSummary`, highlighting potential savings and tool redundancies.
- If the system detects high-value optimization opportunities, the `LeadModal` will appear to capture contact details for a professional consultation.

### API Interaction

The backend exposes a health-check and primary orchestration endpoint:

- **`GET /`**: Returns the current status of the Express API and ensures connectivity with the underlying Node.js runtime.

---

## 🤝 Contributing

We welcome contributions to improve Audit AI! Your input helps make this project better for everyone.

### How to Contribute

1. **Fork the repository** - Click the 'Fork' button at the top right of this page
2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes** - Improve code, documentation, or features
4. **Test thoroughly** - Ensure all functionality works as expected
   ```bash
   npm test
   ```
5. **Commit your changes** - Write clear, descriptive commit messages
   ```bash
   git commit -m 'Add: Amazing new feature that improves AI summary accuracy'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** - Submit your changes for review

---

<div align="center">

### ⭐ If this repository helps you, please give it a star! ⭐

**Happy Coding! 🚀**

---

_Created with ❤️ by Vikas Singh_

</div>
