# Express + TypeScript Starter (pnpm + tsx)

A simple, fast, and modern setup for building Express.js APIs using **TypeScript**, **pnpm**, and **tsx**.

---

## 🚀 Features
- ⚡ Run TypeScript directly with `tsx`
- 🧠 Organized structure (`src` → `dist`)
- 🔄 Auto-reload during development
- 💾 Uses pnpm for faster installs

---

## 📁 Structure
project-root/
│
├── src/
│ ├── index.ts # Main entry point
│ └── routes/ # Express routes (optional)
│
├── dist/ # Compiled JS files (auto-created)
│
├── package.json
├── tsconfig.json
├── pnpm-lock.yaml
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

Make sure you have:
- [Node.js](https://nodejs.org/) (v16+)
- [pnpm](https://pnpm.io/) (install via `npm install -g pnpm`)

---

### 2️⃣ Install Dependencies

In your project root, run:
```bash
pnpm install


Development Mode

To start the server with live reloading:

pnpm run dev


This runs:

tsx watch src/index.ts



Build for Production

Compile TypeScript to JavaScript (output goes to dist/):

pnpm run build


Then start the compiled code:

pnpm start



Example Express Setup

src/index.ts

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript + pnpm 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





