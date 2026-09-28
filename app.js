const $ = (id) => document.getElementById(id);
const brief = $("brief");
const status = $("status");
const result = $("result");

function parseGithub(text) {
  const m = text.match(/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/);
  return m ? { owner: m[1], repo: m[2].replace(/\.git$/, "") } : null;
}

function chooseForm(blob) {
  const t = blob.toLowerCase();
  if (t.includes("@base44/sdk") || t.includes("base44")) return "hybrid showcase + app entry";
  if (t.includes("dashboard") || t.includes("admin") || t.includes("command")) return "premium dashboard homepage";
  if (t.includes("game")) return "interactive product shell";
  if (t.includes("readme") && t.includes("api") && !t.includes("react")) return "polished system overview";
  return "refined showcase";
}

function compose(source, meta) {
  const form = chooseForm(source);
  const isGithub = Boolean(meta);
  const mode = isGithub ? "Public read · atelier judgment" : "Description only · atelier judgment";
  const name = meta ? meta.full_name : "This project";
  const desc = (meta && meta.description) ? meta.description.replace(/\.$/, "") : "what you described";
  const truth = `The honest public experience is a ${form}.`;
  const body = isGithub
    ? `${name} presents itself as ${desc}. The root should answer what it is in one breath, keep unfinished surfaces off the first screen, and preserve deeper routes only where they already work.`
    : `From the brief: ${desc}. Lead with the strongest real surface. Do not decorate gaps. If launch credentials are missing, prepare Vercel config and the root-route decision instead of inventing a live URL.`;
  const next = isGithub
    ? "Next: confirm the public root component, add a Vite SPA rewrite if React Router is in use, then deploy only when the host path is real."
    : "Next: provide a public repository or project folder so she can inspect files instead of inferring from prose.";
  $("modeLabel").textContent = mode;
  $("formLabel").textContent = form;
  $("truthLine").textContent = truth;
  $("bodyLine").textContent = body;
  $("nextLine").textContent = next;
  result.classList.add("show");
}

$("readBtn").addEventListener("click", async () => {
  const text = brief.value.trim();
  if (!text) {
    status.textContent = "A URL or a few honest lines will do.";
    return;
  }
  const gh = parseGithub(text);
  if (!gh) {
    status.textContent = "Composed from the brief. No repository was fetched.";
    compose(text, null);
    return;
  }
  status.textContent = "Reading the public repository…";
  try {
    const repoRes = await fetch(`https://api.github.com/repos/${gh.owner}/${gh.repo}`);
    if (!repoRes.ok) throw new Error("repo");
    const repo = await repoRes.json();
    let extra = "";
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${gh.owner}/${gh.repo}/readme`, {
        headers: { Accept: "application/vnd.github.raw" }
      });
      if (readmeRes.ok) extra = (await readmeRes.text()).slice(0, 4000);
    } catch (_) {}
    status.textContent = `Read ${repo.full_name}.`;
    compose(`${text}\n${repo.description || ""}\n${repo.language || ""}\n${extra}`, repo);
  } catch (err) {
    status.textContent = "The repository could not be read. Composed from what you wrote.";
    compose(text, null);
  }
});
