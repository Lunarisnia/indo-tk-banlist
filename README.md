# 🥊 Indo Tekken Rookie Banlist

> **You are hereby banned from farming money at a rookie tournament.**

A community-maintained website for the Indonesian Tekken scene that tracks players who are **not allowed** to compete in rookie-tier money matches. If you're too good for rookies, you're on this list — and everyone will know it.

---

## 🎮 What Is This?

Rookie tournaments exist so new and developing players can compete without being stomped by veterans fishing for easy prize money. This site maintains a **public banlist** of players who have been flagged by the community for doing exactly that.

- 📋 **Browse the banlist** — sorted alphabetically, always up to date
- 📝 **Submit a ban** — flag a player with evidence (tournament results or community reports)
- 🔍 **Community-reviewed** — all submissions go through review before being added

---

## 🚀 Running Locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🗂️ How the Banlist Works

- The banlist lives in `public/banlist.txt` — one player name per line
- Submissions are saved as markdown files under `submissions/`
- After review, approved names are manually added to `banlist.txt`
- To submit a ban, open a PR or use the in-app submission form at `/submit`

---

## 🛠️ Tech Stack

- **[Next.js](https://nextjs.org)** — React framework
- **Tailwind CSS** — styling
- **TypeScript** — type safety
- **pnpm** — package manager

---

## 🤝 Contributing

Want to nominate someone for the banlist? Use the submission form on the site, or open a PR directly against `public/banlist.txt` with evidence.

All contributions are subject to community review.
