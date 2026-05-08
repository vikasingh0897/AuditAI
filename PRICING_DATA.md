# 💰 AI Pricing Data Reference

This document serves as the "Source of Truth" for the Audit AI calculation engine. All figures are based on monthly billing cycles as of May 2026.

---

## 🛠️ Supported Tools & Pricing

### AI Code Assistants

#### 1. Cursor (AI Code Editor)

| Tier         | Price (Monthly) | Best For    | Key Audit Trigger                                       |
| :----------- | :-------------- | :---------- | :------------------------------------------------------ |
| **Pro**      | $20 / user      | Individuals | Switch to Business if team > 5 for centralized billing. |
| **Business** | $40 / user      | Teams       | Check for unused seats or "Pro" overlap.                |

**Alternatives:** GitHub Copilot, Windsurf, PearAI

---

#### 2. GitHub Copilot

| Tier           | Price (Monthly) | Best For    | Key Audit Trigger                           |
| :------------- | :-------------- | :---------- | :------------------------------------------ |
| **Individual** | $10 / user      | Individuals | Recommend Business tier for team licensing. |
| **Business**   | $19 / user      | Teams       | Check for admin dashboard utilization.      |

**Alternatives:** Cursor, Windsurf

---

#### 3. Windsurf

| Tier      | Price (Monthly) | Best For          | Key Audit Trigger                      |
| :-------- | :-------------- | :---------------- | :------------------------------------- |
| **Pro**   | $15 / user      | Individuals       | Recommend Teams plan for 5+ users.     |
| **Teams** | $30 / user      | Team (5+ minimum) | Verify centralized billing is enabled. |

**Alternatives:** Cursor, GitHub Copilot

---

#### 4. PearAI

| Tier    | Price (Monthly) | Best For    | Key Audit Trigger                     |
| :------ | :-------------- | :---------- | :------------------------------------ |
| **Pro** | $20 / user      | Individuals | Open source focus; compare to Cursor. |

**Alternatives:** Cursor, Windsurf

---

### AI Chat & LLM

#### 5. OpenAI ChatGPT

| Tier           | Price (Monthly) | Best For    | Key Audit Trigger                              |
| :------------- | :-------------- | :---------- | :--------------------------------------------- |
| **Plus**       | $20 / user      | Individuals | Recommend Team for SOC2 compliance/privacy.    |
| **Team**       | $25 / user      | Small Teams | Compare against Claude Team pricing ($5 diff). |
| **Enterprise** | Custom          | Large Orgs  | Trigger "Contact Sales" lead for Credex.       |

**Alternatives:** Anthropic Claude, Google Gemini

---

#### 6. Anthropic Claude

| Tier     | Price (Monthly) | Best For                | Key Audit Trigger                            |
| :------- | :-------------- | :---------------------- | :------------------------------------------- |
| **Pro**  | $20 / user      | Individuals             | Recommend "Team" for better project sharing. |
| **Team** | $30 / user      | Startups (min. 5 seats) | High seat counts ($150+ monthly minimum).    |

**Alternatives:** OpenAI ChatGPT, Google Gemini

---

#### 7. Google Gemini

| Tier         | Price (Monthly) | Best For    | Key Audit Trigger                                  |
| :----------- | :-------------- | :---------- | :------------------------------------------------- |
| **Advanced** | $20 / user      | Individuals | 2TB storage may provide value vs. ChatGPT Plus.    |
| **Business** | $30 / user      | Enterprise  | Enterprise-grade security; compare to Claude Team. |

**Alternatives:** OpenAI ChatGPT, Anthropic Claude

---

### Engineering & DevTools

#### 8. Vercel

| Tier           | Price (Monthly) | Best For   | Key Audit Trigger                          |
| :------------- | :-------------- | :--------- | :----------------------------------------- |
| **Pro**        | $20 / user      | Teams      | Compare to Netlify ($19) for cost savings. |
| **Enterprise** | $3,000 (flat)   | Large Orgs | Verify SSO/SLA requirements are met.       |

**Alternatives:** Netlify, Railway

---

#### 9. Netlify

| Tier    | Price (Monthly) | Best For | Key Audit Trigger                         |
| :------ | :-------------- | :------- | :---------------------------------------- |
| **Pro** | $19 / user      | Teams    | Lowest-cost deployment platform; compare. |

**Alternatives:** Vercel, Railway

---

#### 10. Railway

| Tier      | Price (Monthly) | Best For         | Key Audit Trigger                     |
| :-------- | :-------------- | :--------------- | :------------------------------------ |
| **Hobby** | $5 (flat)       | Solo projects    | Evaluate if truly free tier feasible. |
| **Pro**   | $20 (flat)      | Small teams/apps | Fixed pricing; good for budgeting.    |

**Alternatives:** Vercel, Render

---

#### 11. Render

| Tier        | Price (Monthly) | Best For   | Key Audit Trigger                    |
| :---------- | :-------------- | :--------- | :----------------------------------- |
| **Starter** | $7 (flat)       | Small apps | DDoS protection included; compare.   |
| **Team**    | $19 / user      | Teams      | Centralized logging for large teams. |

**Alternatives:** Railway, Vercel

---

#### 12. v0.dev

| Tier        | Price (Monthly) | Best For              | Key Audit Trigger                    |
| :---------- | :-------------- | :-------------------- | :----------------------------------- |
| **Premium** | $20 / user      | Developers (UI focus) | 2000 credits/mo; verify utilization. |

**Alternatives:** Bolt.new, Lovable.dev

---

#### 13. Bolt.new

| Tier    | Price (Monthly) | Best For              | Key Audit Trigger                      |
| :------ | :-------------- | :-------------------- | :------------------------------------- |
| **Pro** | $25 / user      | Full-stack developers | Instant deployment; compare to v0.dev. |

**Alternatives:** v0.dev, Lovable.dev

---

#### 14. Lovable.dev

| Tier    | Price (Monthly) | Best For              | Key Audit Trigger                        |
| :------ | :-------------- | :-------------------- | :--------------------------------------- |
| **Pro** | $25 (flat)      | Full-stack developers | Flat fee; good for 1-3 concurrent users. |

**Alternatives:** v0.dev, Bolt.new

---

### Productivity & SaaS

#### 15. Linear

| Tier         | Price (Monthly) | Best For    | Key Audit Trigger                  |
| :----------- | :-------------- | :---------- | :--------------------------------- |
| **Basic**    | $10 / user      | Small teams | Unlimited issues; good value.      |
| **Business** | $16 / user      | Teams       | SAML SSO for larger organizations. |

**Alternatives:** Jira, Asana

---

#### 16. Jira

| Tier         | Price (Monthly) | Best For    | Key Audit Trigger                                |
| :----------- | :-------------- | :---------- | :----------------------------------------------- |
| **Standard** | $8.60 / user    | Small teams | Most affordable issue tracker; compare to Asana. |
| **Premium**  | $17 / user      | Teams       | Advanced roadmaps; verify feature usage.         |

**Alternatives:** Linear, Monday.com

---

#### 17. Asana

| Tier        | Price (Monthly) | Best For      | Key Audit Trigger                    |
| :---------- | :-------------- | :------------ | :----------------------------------- |
| **Starter** | $13.49 / user   | Project teams | Workflow builder; compare to Linear. |

**Alternatives:** Linear, Jira

---

#### 18. Monday.com

| Tier         | Price (Monthly) | Best For       | Key Audit Trigger                     |
| :----------- | :-------------- | :------------- | :------------------------------------ |
| **Basic**    | $12 / user      | Teams (min. 3) | Unlimited boards; 200+ templates.     |
| **Standard** | $14 / user      | Teams (min. 3) | Gantt views; verify automation usage. |

**Alternatives:** Jira, Asana, Linear

---

#### 19. Figma

| Tier             | Price (Monthly) | Best For     | Key Audit Trigger                           |
| :--------------- | :-------------- | :----------- | :------------------------------------------ |
| **Professional** | $15 / user      | Design teams | Unlimited files; Dev Mode included.         |
| **Organization** | $45 / user      | Enterprise   | Design systems; centralized admin required. |

**Alternatives:** Penpot, Canva

---

#### 20. Penpot

| Tier    | Price (Monthly) | Best For              | Key Audit Trigger                     |
| :------ | :-------------- | :-------------------- | :------------------------------------ |
| **Pro** | $0 (flat)       | Open source advocates | Unlimited files; no cost alternative. |

**Alternatives:** Figma

---

#### 21. Canva

| Tier    | Price (Monthly) | Best For         | Key Audit Trigger              |
| :------ | :-------------- | :--------------- | :----------------------------- |
| **Pro** | $15 / user      | Content creators | Brand kits; premium templates. |

**Alternatives:** Figma, Adobe Express

---

#### 22. Adobe Express

| Tier        | Price (Monthly) | Best For            | Key Audit Trigger                     |
| :---------- | :-------------- | :------------------ | :------------------------------------ |
| **Premium** | $9.99 / user    | Designers/Marketers | Stock photos; AI effects; budget opt. |

**Alternatives:** Canva, Figma

---

### Data & Analytics

#### 23. Supabase

| Tier    | Price (Monthly) | Best For          | Key Audit Trigger                     |
| :------ | :-------------- | :---------------- | :------------------------------------ |
| **Pro** | $25 (flat)      | Startups/projects | No pausing; daily backups; SQL based. |

**Alternatives:** Firebase, Appwrite, Neon

---

#### 24. Firebase

| Tier      | Price (Monthly) | Best For             | Key Audit Trigger                          |
| :-------- | :-------------- | :------------------- | :----------------------------------------- |
| **Blaze** | $0 + usage      | High-volume projects | Pay-as-you-go; evaluate actual usage cost. |

**Alternatives:** Supabase, Appwrite

---

#### 25. Neon

| Tier       | Price (Monthly) | Best For          | Key Audit Trigger                    |
| :--------- | :-------------- | :---------------- | :----------------------------------- |
| **Launch** | $15 (flat)      | Postgres projects | Autoscaling; point-in-time recovery. |

**Alternatives:** Supabase, PlanetScale

---

#### 26. PlanetScale

| Tier       | Price (Monthly) | Best For       | Key Audit Trigger                  |
| :--------- | :-------------- | :------------- | :--------------------------------- |
| **Scaler** | $39 (flat)      | MySQL projects | Automatic backups; data branching. |

**Alternatives:** Neon, Supabase

---

#### 27. Appwrite

| Tier    | Price (Monthly) | Best For      | Key Audit Trigger                |
| :------ | :-------------- | :------------ | :------------------------------- |
| **Pro** | $25 / user      | Backend teams | Unlimited teams; custom domains. |

**Alternatives:** Supabase, Firebase

---

## 🧮 Audit Math Logic (Rules)

The AuditAI backend uses a real-time comparison engine that matches user input against our verified Pricing database using the following algorithmic steps:

### 1. The "Intra-Tool" Plan Optimization

#### Instead of broad scenario rules, the app now performs a Lowest Cost Tier Search for every tool in your stack.

- **Logic:** For each tool, the engine filters all available tiers where `teamSize <= maxSeats`.
- **Calculation:** It compares the cost of your current plan against the `bestTier` (calculated as `pricePerSeat * seats` or a `isFlatFee` bundle).
- **Insigh:** "You are currently overpaying for your seat count. The **_[Optimal Plan]_** covers your team for **_$[Price]_**/mo."

### 2. The "Credex" Ecosystem Arbitrage

#### The engine identifies opportunities to eliminate spend by leveraging the Credex Startup Network.

- **Logic:** Even if your current plan is math-optimized, the engine looks for an **_alternativeTool_** within the same category that has **_credexAvailable: true_**.
- **Insigh:** "While your plan is priced correctly, **_[Alternative Tool]_** offers startup credits via Credex that could offset this cost entirely."

### 3. The "Flat-Fee" Bundle Advantage

#### The engine automatically detects when a startup is paying "per-seat" for a service that offers a more economical "Flat-Fee" bundle.

- **Logic:** The math engine compares `(Price \* Seats)` vs. `(FlatFeePrice)`. If the bundle is cheaper, it triggers a recommendation.
- **Insigh:** "Flat-fee bundle identified. Switching to the **_[Team/Business]_** tier removes the 'Seat Tax' and saves you **_$[Savings]_**/mo as you scale."

### 4. Categorical Redundancy Logic

#### By using the `category` field from the `Pricing` model, the engine groups your tools (e.g., AI Code Assistants, Data & Analytics).

- **Logic:** T"Category Overlap Detected. We found multiple tools in the **_[Category]_** space. Consolidating to our top-rated recommendation could streamline your dev workflow."

---

## 📊 Result Matrix (Professional Output)

The audit results should be presented in a high-fidelity table:

| Opportunity Type      | Strategy                    | Estimated ROI | Priority |
| :-------------------- | :-------------------------- | :------------ | :------- |
| **Billing Structure** | Monthly ➔ Annual Transition | $1,200        | 🟢 High  |
| **License Waste**     | Team Consolidation (SSO)    | $450 + ⏱️     | 🟡 Med   |
| **Stack Overlap**     | Redundancy Cleanup          | $240          | 🟢 High  |
| **Architectural**     | API Arbitrage (BYOK)        | $900          | ⚪ Low   |

---

## 🔗 Sources & Citations

### Official Pricing Pages (Accessed May 2026)

**AI Code Assistants:**

- [Cursor Pricing](https://www.cursor.com/pricing)
- [GitHub Copilot Plans](https://github.com/features/copilot/plans)
- [Windsurf Pricing](https://codeium.com/windsurf/pricing)
- [PearAI Pricing](https://trypear.ai/pricing)

**AI Chat & LLM:**

- [OpenAI ChatGPT Pricing](https://openai.com/chatgpt/pricing/)
- [Anthropic Claude Plans](https://www.anthropic.com/claude/team)
- [Google Gemini Advanced](https://gemini.google.com/advanced)

**Engineering & DevTools:**

- [Vercel Pricing](https://vercel.com/pricing)
- [Netlify Pricing](https://www.netlify.com/pricing/)
- [Railway Pricing](https://railway.app/pricing)
- [Render Pricing](https://render.com/pricing)
- [v0.dev Pricing](https://v0.dev/pricing)
- [Bolt.new Pricing](https://bolt.new/pricing)
- [Lovable.dev Pricing](https://lovable.dev/pricing)

**Productivity & SaaS:**

- [Linear Pricing](https://linear.app/pricing)
- [Jira Pricing](https://www.atlassian.com/software/jira/pricing)
- [Asana Pricing](https://asana.com/pricing)
- [Monday.com Pricing](https://monday.com/pricing)
- [Figma Pricing](https://www.figma.com/pricing/)
- [Penpot Pricing](https://penpot.app/pricing)
- [Canva Pricing](https://www.canva.com/pricing)
- [Adobe Express Pricing](https://www.adobe.com/express/pricing)

**Data & Analytics:**

- [Supabase Pricing](https://supabase.com/pricing)
- [Firebase Pricing](https://firebase.google.com/pricing)
- [Neon Pricing](https://neon.tech/pricing)
- [PlanetScale Pricing](https://planetscale.com/pricing)
- [Appwrite Pricing](https://appwrite.io/pricing)

---

_Note: This data is static. Future iterations will integrate the Scraping API for real-time updates._
