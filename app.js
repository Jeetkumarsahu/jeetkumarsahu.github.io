const issues = [
  {
    id: "JS-001",
    title: "Main road par 3 mahine se gaddhe",
    category: "Road",
    level: "area",
    state: "Madhya Pradesh",
    location: "Ward 12, Indore",
    status: "Verified",
    severity: "High",
    supports: 284,
    verifications: 42,
    evidence: 7,
    reporter: "Local Reporter 18",
    trust: 86,
    summary: "School aur market ke beech road damage hai. Rain ke baad water logging aur accident risk badh gaya.",
    timeline: ["Reported: 04 Jun", "Verified: 06 Jun", "Sent to civic office: 07 Jun"]
  },
  {
    id: "JS-002",
    title: "Primary health center me doctor timing unclear",
    category: "Health",
    level: "area",
    state: "Madhya Pradesh",
    location: "Sanwer Block",
    status: "Pending",
    severity: "Medium",
    supports: 119,
    verifications: 21,
    evidence: 4,
    reporter: "Clinic Watch MP",
    trust: 78,
    summary: "Patients ko pata nahi chalta doctor kab available hain. Notice board aur helpline update nahi hai.",
    timeline: ["Reported: 11 Jun", "Duplicate check passed: 12 Jun"]
  },
  {
    id: "JS-003",
    title: "Water tanker schedule public nahi hai",
    category: "Water",
    level: "area",
    state: "Madhya Pradesh",
    location: "Village Palda",
    status: "In Progress",
    severity: "High",
    supports: 341,
    verifications: 58,
    evidence: 9,
    reporter: "Palda Updates",
    trust: 91,
    summary: "Logon ko tanker ka time random milta hai. Public schedule aur complaint number ki demand hai.",
    timeline: ["Reported: 28 May", "Verified: 29 May", "Department response: 02 Jun"]
  },
  {
    id: "JS-004",
    title: "Urban air quality readings high",
    category: "Pollution",
    level: "national",
    state: "Delhi",
    location: "North Delhi",
    status: "Verified",
    severity: "High",
    supports: 1380,
    verifications: 236,
    evidence: 18,
    reporter: "Clean Air Desk",
    trust: 88,
    summary: "Multiple public sensors and citizen photos show dust-heavy corridors near construction zones.",
    timeline: ["Reported: 01 Jun", "Sensor evidence attached: 03 Jun", "National review queue: 05 Jun"]
  },
  {
    id: "JS-005",
    title: "Government school boundary repair complete",
    category: "Education",
    level: "solved",
    state: "Madhya Pradesh",
    location: "Rau, Indore",
    status: "Solved",
    severity: "Medium",
    supports: 201,
    verifications: 39,
    evidence: 12,
    reporter: "School Watch",
    trust: 93,
    summary: "Boundary wall damage report ke baad repair work complete hua. Before/after proof attached.",
    timeline: ["Reported: 17 Apr", "Verified: 19 Apr", "Work order: 26 Apr", "Solved proof: 18 May"]
  }
];

const leaders = [
  {
    name: "Asha Verma",
    role: "Fictional MLA profile",
    area: "Indore Urban",
    scores: {
      resolution: 4.1,
      promises: 3.6,
      response: 4.4,
      transparency: 3.8,
      feedback: 3.9,
      conduct: 4.2
    },
    note: "Strong response time and issue closure. Promise tracker still needs more verified public sources."
  },
  {
    name: "Raghav Singh",
    role: "Fictional MP profile",
    area: "Regional seat",
    scores: {
      resolution: 2.1,
      promises: 2.3,
      response: 1.8,
      transparency: 2.8,
      feedback: 2.2,
      conduct: 3.0
    },
    note: "Falls into Accountability Watch because verified pending issues and response time are weak."
  },
  {
    name: "Naina Khan",
    role: "Fictional council profile",
    area: "Ward 12",
    scores: {
      resolution: 4.5,
      promises: 4.0,
      response: 4.1,
      transparency: 3.6,
      feedback: 4.3,
      conduct: 4.0
    },
    note: "Good local closure rate. Transparency score can improve with public budget source links."
  }
];

const state = {
  activeTab: "area",
  selectedCategory: "All",
  selectedState: "Madhya Pradesh"
};

const weights = {
  resolution: 0.4,
  promises: 0.2,
  response: 0.15,
  transparency: 0.1,
  feedback: 0.1,
  conduct: 0.05
};

const feed = document.querySelector("#feed");
const issueTemplate = document.querySelector("#issueCardTemplate");
const leaderTemplate = document.querySelector("#leaderTemplate");
const categoryFilter = document.querySelector("#categoryFilter");
const stateSelect = document.querySelector("#stateSelect");
const areaSelect = document.querySelector("#areaSelect");
const tabButtons = document.querySelectorAll(".tab-button");
const feedEyebrow = document.querySelector("#feedEyebrow");
const feedTitle = document.querySelector("#feedTitle");

function getStoredIssues() {
  const saved = localStorage.getItem("jansetu-issues");
  if (!saved) return issues;

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : issues;
  } catch {
    return issues;
  }
}

function saveIssues(nextIssues) {
  localStorage.setItem("jansetu-issues", JSON.stringify(nextIssues));
}

function currentIssues() {
  return getStoredIssues();
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function slug(value) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function issueMatchesTab(issue) {
  if (state.activeTab === "area") {
    return issue.level === "area" && issue.state === state.selectedState;
  }
  if (state.activeTab === "national") return issue.level === "national";
  if (state.activeTab === "solved") return issue.status === "Solved";
  return false;
}

function filteredIssues() {
  return currentIssues().filter((issue) => {
    const categoryMatch = state.selectedCategory === "All" || issue.category === state.selectedCategory;
    return issueMatchesTab(issue) && categoryMatch;
  });
}

function renderMetrics() {
  const allIssues = currentIssues();
  const verified = allIssues.filter((issue) => ["Verified", "In Progress", "Solved"].includes(issue.status)).length;
  const solved = allIssues.filter((issue) => issue.status === "Solved").length;
  const pending = allIssues.filter((issue) => ["Pending", "Reported", "In Progress"].includes(issue.status)).length;
  const watch = leaders.filter((leader) => getLeaderScore(leader) < 2.5).length;

  document.querySelector("#verifiedCount").textContent = verified;
  document.querySelector("#solvedCount").textContent = solved;
  document.querySelector("#pendingCount").textContent = pending;
  document.querySelector("#watchCount").textContent = watch;
}

function renderIssueCard(issue) {
  const card = issueTemplate.content.firstElementChild.cloneNode(true);
  const frame = card.querySelector(".evidence-frame");
  const status = card.querySelector(".status-pill");

  frame.classList.add(issue.category.toLowerCase());
  card.querySelector(".category-chip").textContent = issue.category;
  card.querySelector(".issue-visual-title").textContent = issue.title;
  card.querySelector("h3").textContent = issue.title;
  card.querySelector(".summary").textContent = issue.summary;
  card.querySelector(".location-text").textContent = `${issue.location} | ${issue.id}`;

  status.textContent = issue.status;
  status.classList.add(slug(issue.status));

  card.querySelector(".issue-stats").innerHTML = `
    <span>${issue.supports} supports</span>
    <span>${issue.verifications} verifications</span>
    <span>${issue.evidence} evidence files</span>
    <span>Reporter trust ${issue.trust}/100</span>
  `;

  card.querySelector(".support-button").addEventListener("click", () => updateIssue(issue.id, { supports: issue.supports + 1 }));
  card.querySelector(".verify-button").addEventListener("click", () => updateIssue(issue.id, { verifications: issue.verifications + 1 }));
  card.querySelector(".share-button").addEventListener("click", () => shareIssue(issue));

  return card;
}

function renderIssues() {
  feed.innerHTML = "";
  feed.className = "feed";
  categoryFilter.hidden = false;

  if (state.activeTab === "leaders") {
    renderLeaders();
    return;
  }

  if (state.activeTab === "report") {
    renderReportForm();
    return;
  }

  updateHeadings();

  const list = filteredIssues();
  if (list.length === 0) {
    feed.innerHTML = `<div class="empty-state">No records found for this filter.</div>`;
    renderMetrics();
    return;
  }

  list.forEach((issue) => feed.appendChild(renderIssueCard(issue)));
  renderMetrics();
}

function renderLeaders() {
  feedEyebrow.textContent = "Leaders";
  feedTitle.textContent = "Data-weighted accountability";
  categoryFilter.hidden = true;
  feed.className = "feed leader-list";
  feed.innerHTML = "";
  leaders.forEach((leader) => feed.appendChild(renderLeaderCard(leader)));
  renderMetrics();
}

function getLeaderScore(leader) {
  const total = Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + leader.scores[key] * weight;
  }, 0);
  return Number(total.toFixed(1));
}

function renderLeaderCard(leader) {
  const card = leaderTemplate.content.firstElementChild.cloneNode(true);
  const score = getLeaderScore(leader);

  card.querySelector(".role").textContent = leader.role;
  card.querySelector("h3").textContent = leader.name;
  card.querySelector(".area").textContent = leader.area;
  card.querySelector(".overall-score").textContent = `${score}/5`;
  card.querySelector(".leader-note").textContent = score < 2.5 ? `Accountability Watch: ${leader.note}` : leader.note;

  const bars = card.querySelector(".score-bars");
  bars.innerHTML = "";

  Object.entries(leader.scores).forEach(([key, value]) => {
    const row = document.createElement("div");
    const fillClass = value < 2.5 ? "low" : value < 3.6 ? "mid" : "";
    row.className = "score-row";
    row.innerHTML = `
      <span>${titleCase(key)}</span>
      <span class="bar-track"><span class="bar-fill ${fillClass}" style="width: ${(value / 5) * 100}%"></span></span>
      <span>${value}</span>
    `;
    bars.appendChild(row);
  });

  return card;
}

function renderReportForm() {
  feedEyebrow.textContent = "Report";
  feedTitle.textContent = "Submit a public problem";
  categoryFilter.hidden = true;
  feed.className = "feed";
  feed.innerHTML = `
    <form class="report-form" id="reportForm">
      <div class="form-grid">
        <label>Problem title
          <input name="title" required maxlength="80" placeholder="Example: Ward 8 road light not working">
        </label>
        <label>Category
          <select name="category">
            <option>Road</option>
            <option>Water</option>
            <option>Health</option>
            <option>Education</option>
            <option>Pollution</option>
            <option>Jobs</option>
          </select>
        </label>
        <label>Location
          <input name="location" required maxlength="80" placeholder="Village, block, city, or ward">
        </label>
        <label>Severity
          <select name="severity">
            <option>Medium</option>
            <option>High</option>
            <option>Low</option>
          </select>
        </label>
        <label class="full-row">Evidence note
          <textarea name="summary" required maxlength="260" placeholder="Short, factual description. Avoid personal abuse or party slogans."></textarea>
        </label>
      </div>
      <button type="submit">Submit report</button>
    </form>
  `;

  document.querySelector("#reportForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const allIssues = currentIssues();
    const newIssue = {
      id: `JS-${String(allIssues.length + 1).padStart(3, "0")}`,
      title: data.get("title"),
      category: data.get("category"),
      level: areaSelect.value === "National" ? "national" : "area",
      state: state.selectedState,
      location: data.get("location"),
      status: "Reported",
      severity: data.get("severity"),
      supports: 0,
      verifications: 0,
      evidence: 1,
      reporter: "New Reporter",
      trust: 50,
      summary: data.get("summary"),
      timeline: ["Reported today"]
    };

    saveIssues([newIssue, ...allIssues]);
    state.activeTab = newIssue.level === "national" ? "national" : "area";
    syncTabs();
    renderIssues();
  });

  renderMetrics();
}

function updateIssue(id, patch) {
  const nextIssues = currentIssues().map((issue) => {
    return issue.id === id ? { ...issue, ...patch } : issue;
  });
  saveIssues(nextIssues);
  renderIssues();
}

async function shareIssue(issue) {
  const text = `${issue.title} - ${issue.location} (${issue.id})`;
  try {
    await navigator.clipboard.writeText(text);
    alert("Issue text copied.");
  } catch {
    alert(text);
  }
}

function updateHeadings() {
  const labels = {
    area: ["My Area", "Public problem feed"],
    national: ["National", "Large public issues"],
    solved: ["Solved", "Resolution records"]
  };
  const [eyebrow, title] = labels[state.activeTab] || labels.area;
  feedEyebrow.textContent = eyebrow;
  feedTitle.textContent = title;
}

function syncTabs() {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === state.activeTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.activeTab = button.dataset.tab;
    syncTabs();
    renderIssues();
  });
});

categoryFilter.addEventListener("change", (event) => {
  state.selectedCategory = event.target.value;
  renderIssues();
});

stateSelect.addEventListener("change", (event) => {
  state.selectedState = event.target.value;
  renderIssues();
});

areaSelect.addEventListener("change", (event) => {
  if (event.target.value === "National") {
    state.activeTab = "national";
  } else if (state.activeTab === "national") {
    state.activeTab = "area";
  }
  syncTabs();
  renderIssues();
});

renderIssues();
