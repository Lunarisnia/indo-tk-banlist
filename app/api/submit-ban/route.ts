import type { NextRequest } from "next/server";

const REPO = process.env.GH_REPO!; // e.g. "Lounarisnia/indo-tk-banlist"
const TOKEN = process.env.GH_PAT!;

async function gh(path: string, options: RequestInit = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${path}: ${res.status} ${text}`);
  }
  return res.json();
}

export async function POST(request: NextRequest) {
  const { playerName, reason, description, evidence, submittedBy } =
    await request.json();

  if (!playerName?.trim() || !evidence?.trim() || !submittedBy?.trim()) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const name = playerName.trim();

  // Check duplicate
  const fileData = await gh(`/repos/${REPO}/contents/public/banlist.txt`);
  const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");
  if (currentContent.split("\n").map((l) => l.trim()).includes(name)) {
    return Response.json(
      { error: "Player is already on the banlist" },
      { status: 409 }
    );
  }

  // Get main SHA
  const ref = await gh(`/repos/${REPO}/git/ref/heads/main`);
  const mainSha: string = ref.object.sha;

  // Create branch
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const branch = `ban/${slug}-${Date.now()}`;
  await gh(`/repos/${REPO}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: mainSha }),
  });

  // Append name to banlist.txt
  const updated = currentContent.trimEnd() + "\n" + name + "\n";
  await gh(`/repos/${REPO}/contents/public/banlist.txt`, {
    method: "PUT",
    body: JSON.stringify({
      message: `ban: add ${name}`,
      content: Buffer.from(updated).toString("base64"),
      sha: fileData.sha,
      branch,
    }),
  });

  // Open PR using the same format the ban_submission workflow expects
  const prBody = `## Rookie Banlist Submission

**Player name (exact, as it appears in-game):**
\`\`\`
${name}
\`\`\`

**Reason for ban:**
${reason}

**Description:**
${description}

**Evidence:**
${evidence?.trim() || "_No evidence provided._"}

**Reported by:**
${submittedBy.trim()}

---

**Checklist:**
- [x] Name added to \`public/banlist.txt\` (one entry per line, no trailing spaces)
- [x] No duplicate — searched existing banlist before submitting
`;

  const pr = await gh(`/repos/${REPO}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title: `ban: ${name}`,
      body: prBody,
      head: branch,
      base: "main",
    }),
  });

  return Response.json({ pr: pr.html_url }, { status: 201 });
}
