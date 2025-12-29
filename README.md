---
# UAT Tune2Protect API Integration

This project is a **Node.js + TypeScript API integration** for the Tune2Protect (T2P) UAT environment.
It uses **Express**, **TypeScript**, **Zod** for validation, and environment-based configuration.
---

## 📁 Project Structure

```
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.ts
│   ├── config
│   │   └── index.ts
│   ├── middleware
│   │   └── validators
│   │       ├── insurance-plans-confirm.validator.ts
│   │       └── insurance-plans.validator.ts
│   ├── router
│   │   └── index.ts
│   ├── server.ts
│   ├── services
│   │   └── insurance.service.ts
│   ├── types
│   │   ├── insurance-plans-confirm.ts
│   │   └── t2p.ts
│   └── utils
│       └── validation.ts
├── tsconfig.json
└── uta-tune.postman_collection.json
```

## ⚙️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd uat-tune2protec-api-intregration
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

## 🌱 Environment Configuration

This project uses environment-specific `.env` files.

### Create Environment Files

Copy from the example file:

```bash
cp .env.example .env.development
cp .env.example .env.production
```

> ⚠️ Do NOT commit `.env.development` or `.env.production` files to Git.

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

---

### Build for Production

```bash
npm run build
```

- Compiles TypeScript into the `dist/` directory

---

### Start Production Server

```bash
npm run start
```

- Uses `NODE_ENV=production`
- Runs compiled JavaScript from `dist/`

---

## 🧪 Postman Collection Import

To test APIs using Postman:

1. Open **Postman**
2. Click **Import**
3. Select `collection.json`
4. Click **Import**

All API requests will be available inside Postman.

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- Express
- Zod (validation)
- dotenv
- tsx
- cross-env

---

## 📜 NPM Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Compile TypeScript       |
| `npm run start` | Run production server    |

---

## 📄 License

ISC License

---

## 👤 Author

**Samrajya Pratap Rana**

---
