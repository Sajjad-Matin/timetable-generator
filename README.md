# 📅 Timetable Generator

> An automated school scheduling engine that eliminates the manual headache of timetable planning — generating conflict-free schedules across all classes, teachers, and rooms in seconds.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

---

## 📌 Problem Statement

Creating school timetables manually is a time-consuming, error-prone process — teachers get double-booked, rooms get double-assigned, and the whole thing has to be redone whenever anything changes. This system automates the entire scheduling process: input your teachers, subjects, classes, and rooms, and get a conflict-free timetable instantly.

---

## ✨ Features

- 👩‍🏫 **Teacher Availability Management** — define when each teacher is available and let the system respect those constraints automatically
- ⚠️ **Conflict Detection** — prevents double-booking of teachers, rooms, and classes at the same time slot
- 🏫 **Multi-Room Support** — schedule across multiple classrooms simultaneously
- 🖨️ **PDF Export** — export any generated timetable as a print-ready PDF for instant distribution
- 🗂️ **Class & Subject Management** — manage all classes, subjects, and their relationships from one place
- 📊 **Admin Dashboard** — full visibility over the schedule with the ability to make manual adjustments

---

## 🏗️ Architecture

```
timetable-generator/
├── backend/               # Node.js + Express REST API
│   ├── src/
│   │   ├── teachers/      # Teacher & availability management
│   │   ├── rooms/         # Room management
│   │   ├── classes/       # Class & subject management
│   │   ├── schedule/      # Core scheduling engine & conflict detection
│   │   ├── export/        # PDF generation logic
│   │   └── common/        # Shared utilities & middleware
│   ├── prisma/
│   │   └── schema.prisma
│   └── test/
└── frontend/              # Next.js + Tailwind CSS
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── hooks/
    │   └── services/      # API client layer
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/Sajjad-Matin/timetable-generator.git
cd timetable-generator
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```dotenv
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/timetable?schema=public"
```

Run Prisma migrations and start the server:

```bash
npx prisma migrate dev
npm run dev
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`
The API will be available at `http://localhost:5000`

---

## 🧪 Running Tests

```bash
cd backend

# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage report
npm run test:cov
```

---

## 🔌 API Overview

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/teachers`                 | List all teachers                  |
| POST   | `/teachers`                 | Add a new teacher                  |
| PUT    | `/teachers/:id/availability`| Update teacher availability        |
| GET    | `/rooms`                    | List all rooms                     |
| POST   | `/rooms`                    | Add a new room                     |
| GET    | `/classes`                  | List all classes & subjects        |
| POST   | `/classes`                  | Add a new class                    |
| POST   | `/schedule/generate`        | Generate a conflict-free timetable |
| GET    | `/schedule/:id`             | Get a generated timetable          |
| GET    | `/schedule/:id/export/pdf`  | Export timetable as PDF            |

---

## 🛣️ Roadmap

- [ ] Docker & Docker Compose setup
- [ ] Drag-and-drop manual schedule adjustments
- [ ] Excel export in addition to PDF
- [ ] Multi-school / multi-branch support
- [ ] Email timetable distribution to teachers

---

## 👨‍💻 Author

**Sajjad Matin**
- Portfolio: [my-portfolio-vert-seven.vercel.app](https://my-portfolio-vert-seven.vercel.app)
- LinkedIn: [sajjad-matin-mahmodi](https://linkedin.com/in/sajjad-matin-mahmodi-4308602b5)
- Email: sajjadmatinm@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
