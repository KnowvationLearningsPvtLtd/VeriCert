# VeriCert
A Digital Certificates platform
### 📜 Commit Message Rules Guide

This document explains how to write structured commit messages using **commitlint** and the **Conventional Commits** standard.

---

## 🔹 **Commit Message Format**

A valid commit message must follow this format:

```plaintext
<type>: <description>
```

### ✅ **Examples**

```
feat: Add login authentication
fix: Resolve database connection issue
docs: Update README with API details
```

---

## 🔹 **Allowed Commit Types**

Each commit must start with a **valid type**:

| Type       | Meaning                                                |
| ---------- | ------------------------------------------------------ |
| `feat`     | A new feature                                          |
| `fix`      | A bug fix                                              |
| `docs`     | Documentation changes (README, comments, etc.)         |
| `style`    | Code formatting (spaces, indentation, no logic change) |
| `refactor` | Code restructuring (no bug fixes or features)          |
| `perf`     | Performance improvements                               |
| `test`     | Adding/modifying tests                                 |
| `build`    | Changes in build tools, dependencies, etc.             |
| `ci`       | CI/CD pipeline changes                                 |
| `chore`    | Maintenance (e.g., updating dependencies)              |
| `revert`   | Reverting a previous commit                            |

🚫 **Invalid Commits (Blocked)**

```
update: Improve performance  ❌ (not an allowed type)
change: Refactor login logic  ❌ (not an allowed type)
```

---

## 🔹 **Subject Formatting Rules**

✅ **Do**:  
✔ Use **sentence case** (capitalize first word, lowercase rest)  
✔ Keep the message **short and clear** (max 72 characters)

🚫 **Don't**:  
❌ Use **lowercase** for the first letter (`feat: improve performance`)  
❌ Use **all caps** (`feat: IMPROVE PERFORMANCE`)  
❌ End with a **period** (`fix: Resolve cache issue.`)

---

## 🔹 **Why Follow These Rules?**

✔ Makes commit history **consistent & readable**  
✔ Helps in **automated versioning & changelogs**  
✔ Enforces **best practices** for team collaboration

---

By following these rules, your commits will be **clean, structured, and useful**! 🚀

## TESTS

### ✅ Running Tests

Run all tests with:

```bash
pnpm test --detectOpenHandles
```

> The `--detectOpenHandles` flag helps identify any hanging resources like open DB connections or async operations that are not properly cleaned up after tests.

---

### 🧪 Test Structure Overview

| Test Type           | What to Test?                             | Tools Used              |
|---------------------|-------------------------------------------|-------------------------|
| **Unit Tests**      | Middlewares, Models, Utils                | Jest                    |
| **Integration Tests** | APIs, Services, DB Queries               | Supertest, Jest         |
| **Database Tests**  | Prisma Queries, Constraints, Relations    | Jest, Prisma            |
| **Utility Tests**   | Helper Functions, Validators, Formatters  | Jest                    |
| **Fixtures**        | Mock Data (Users, Tasks, etc.)            | Plain TypeScript Files  |

---

By following these conventions and practices, **VeriCert** remains maintainable, testable, and developer-friendly. 🚀

---

### ✅ API Documentation

- Swagger UI is available at:  
  **`http://localhost:3000/swagger`**

It provides:
- A full list of available API endpoints
- Request and response formats
- HTTP status codes
- Example inputs/outputs

---

