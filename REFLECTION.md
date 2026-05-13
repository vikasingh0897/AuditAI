# REFLECTION.md - Audit AI

### 1. The hardest bug you hit this week, and how you debugged it

The most challenging technical hurdle was a combination of persistent CORS (Cross-Origin Resource Sharing) errors and strict linting failures during the Vercel deployment phase. While the application worked perfectly in my local environment, the production build initially failed because the backend on Render was rejecting requests from the frontend domain. Simultaneously, the pre-build linting step flagged several type-safety issues in my audit logic. To debug this, I hypothesized that my Express middleware was incorrectly scoped for production origins. I utilized **_Stack Overflow_** to identify the correct `cors` package configuration for dynamic origins and consulted **_Gemini_** to help refactor my TypeScript interfaces to satisfy the compiler without resorting to `any` types. After several iterative commits to adjust the headers and type definitions, the build finally passed with green checks across the board.

---

### 2. A decision you reversed mid-week, and what made you reverse it

Mid-week, I reversed my decision to use manual validation logic for the user's spend input form and switched to **_Zod_**. Initially, I believed manual `if-else` checks would be faster to ship, but as the tool grew to support 8+ AI vendors with varying tiers, the manual validation became unmaintainable and prone to errors. I realized that for the audit engine to be truly "defensible"—as required by the assignment—the data entering the system had to be perfectly structured. Switching to Zod allowed me to define strict schemas for tool plans, seat counts, and monthly spend. This pivot reduced my code footprint, improved the reliability of the audit engine, and ensured that malformed data could never trigger a false calculation.

---

### 3. What you would build in week 2 if you had it

If I had a second week, I would prioritize the enhancing my **_*audit controller logic*_** and **_Benchmark Mode_** bonus features to increase the tool's professional utility. Benchmark mode would compare the user's "AI spend per developer" against industry averages for companies at their specific stage, providing a powerful psychological hook for the audit. I would also build an automated price-monitoring service to ensure `PRICING_DATA.md` stays updated without manual intervention. Finally, I would refine the **_Shareable Result URL_** to include interactive data visualizations, making the "viral loop" even more compelling for founders sharing their reports on LinkedIn or X.

---

### 4. How you used AI tools

I used **_Gemini_** extensively as a pair-programmer to troubleshoot the **_GitHub Actions CI workflow (`ci.yml`)_** and to optimize the complex logic used for the tool recommendations. For instance, when my CI pipeline kept failing due to environment variable mismatches, Gemini helped me restructure the YAML file to handle secrets correctly. I also utilized AI to generate the personalized audit summary paragraph, as it is the only feature where AI usage is strictly required. One specific instance where the AI was wrong was when it suggested an outdated Zod syntax that was incompatible with my version; I caught this by cross-referencing the official documentation and correcting the schema manually. I did not trust AI for the core financial math, which I kept entirely deterministic to ensure 100% accuracy.

---

### 5. Self-rating (1-10)

- **_Discipline: 9/10_** – I maintained a consistent `DEVLOG.md` and committed code across 5+ distinct calendar days as required.
- **_Code Quality: 8/10_** – I overcame significant linting and type-safety hurdles to ensure the codebase is clean, idiomatic, and robust.
- **_Design Sense: 7/10_** – I prioritized "visual quality" for the results page, though I focused more on functional clarity than complex animations.
- **_Problem-solving: 8/10_** – I successfully navigated deployment, CORS, and validation issues using a mix of documentation, AI, and community resources.
- **_Entrepreneurial thinking: 9/10_** – I treated this as a real product launch, investing heavily in the GTM, Economics, and User Interview files to prove market viability.

---

<div align="center">

Last Updated: May 2026 | Vikas Singh

</div>
