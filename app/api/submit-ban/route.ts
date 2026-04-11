import type { NextRequest } from "next/server";

const REPO = process.env.GH_REPO!;
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
  const { playerName, evidence, submittedBy } = await request.json();

  if (!playerName?.trim() || !evidence?.trim() || !submittedBy?.trim()) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const name = playerName.trim();
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const branch = `ban/${slug}-${Date.now()}`;

  // Get main SHA
  const ref = await gh(`/repos/${REPO}/git/ref/heads/main`);
  const mainSha: string = ref.object.sha;

  // Create branch
  await gh(`/repos/${REPO}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: mainSha }),
  });

  // Create submission file
  const fileContent = `## Rookie Banlist Submission

**Player name (exact, as it appears in-game):**
\`\`\`
${name}
\`\`\`

**Evidence (Tournament results or community banlist):**
${evidence.trim()}

**Submitted By:**
\`\`\`
${submittedBy.trim()}
\`\`\`
`;

  await gh(`/repos/${REPO}/contents/submissions/${slug}-${Date.now()}.md`, {
    method: "PUT",
    body: JSON.stringify({
      message: `ban: submit ${name}`,
      content: Buffer.from(fileContent).toString("base64"),
      branch,
    }),
  });

  const pr = await gh(`/repos/${REPO}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title: `ban: ${name}`,
      body: fileContent,
      head: branch,
      base: "main",
    }),
  });

  return Response.json({ pr: pr.html_url }, { status: 201 });
}
