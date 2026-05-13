# TESTS.md — Audit AI

> This project implements a robust testing suite for the core Audit Engine to ensure all financial recommendations are accurate, defensible, and meet Credex's "Honesty" standards.

---

## 🧪 Test Execution

- To run the automated test suite, use the following command:

```bash
npm run test
```

---

## 📋 Audit Engine Coverage

- As required by the assignment, these 5 tests cover the critical logic of the calculation engine:

| Filename          | Test Case              | Coverage & Logic                                                                           |
| :---------------- | :--------------------- | :----------------------------------------------------------------------------------------- |
| **audit.test.ts** | **Plan Optimization**  | Validates that the engine recommends a downgrade when a small team is on an overkill plan. |
| **audit.test.ts** | **Flat Fee vs. Seats** | Ensures accurate comparison between fixed-fee Enterprise tiers and scaling per-seat costs. |
| **audit.test.ts** | **Team Size Limits**   | Verifies that the engine ignores plans that cannot support the current team size.          |
| **audit.test.ts** | **Honesty Check**      | Confirms the engine returns $0 savings if the user is already on the most optimal plan.    |
| **audit.test.ts** | **Credex Integration** | Tests the logic for surfacing Credex alternatives when significant savings are identified. |

---

## 🛠️ Technical Details

- **_Framework:_** Jest with TypeScript.
- **_CI Integration:_** These tests are automatically executed on every push to main via the .github/workflows/ci.yml pipeline
- **_Mocking:_** Mongoose queries are mocked using jest.spyOn to isolate the logic from the MongoDB database, ensuring tests are fast and deterministic.

---

<div align="center">

Last Updated: May 2026 | Vikas Singh

</div>
