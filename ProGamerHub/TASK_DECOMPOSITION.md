
# TASK DECOMPOSITION — ProGamer Hub

## 1. Project Overview

**Project:** ProGamer Hub — PUBG Vietnam Esports Dashboard

**Technologies:** React, Vite, JavaScript, CSS Modules, Git, GitHub.

**Objective:** Build one web application containing three exercises:
- EX1: Developer Profile.
- EX2: Scientist and Pioneer Directory.
- EX3: PUBG Vietnam Live Radar.

## 2. Task Breakdown

### EX1 — Developer Profile

- Create reusable DeveloperCard and SkillBadge components.
- Use semantic HTML and avoid div elements in DeveloperCard.jsx.
- Display developer information, metrics, avatar, and skills.
- Use CSS Modules and responsive CSS.
- Verify accessibility and the 375px layout.

Required commits:

1. `feat(ex1): implement semantic DeveloperCard and SkillBadge`
2. `style(ex1): add responsive 375px CSS module`

### EX2 — Scientist and Pioneer Directory

- Normalize smartPeople data with stable IDs.
- Implement case-insensitive name search.
- Implement minimum-IQ filtering using valueAsNumber and Number.isNaN().
- Sort using immutable toSorted().
- Implement immutable deletion and Reset.
- Use useId(), labels, and an accessible live result count.
- Calculate filtered results during rendering without useEffect.

Required commits:

1. `feat(ex2): normalize smartPeople schema with stable IDs`
2. `feat(ex2): add search, IQ filter & toSorted`
3. `feat(ex2): add delete/reset & live status`

### EX3 — PUBG Live Radar

- Create PubgMatchTelemetry.
- Display CES, TE, and GE telemetry.
- Implement IDLE, LOADING, SUCCESS, and ERROR states.
- Simulate 35% packet loss.
- Use useEffect and AbortController.
- Ignore intentional AbortError exceptions.
- Display a 220px skeleton loader.
- Display connection errors using role="alert".
- Implement Reconnect Satellite retry.
- Test rapid squad switching and responsive layout.

Required commits:

1. `feat(ex3): implement PUBG VN 4-state telemetry & AbortController`
2. `feat(ex3): add skeleton UI & retry alert`

## 3. Verification Plan

- Run the application using npm run dev.
- Run npm run build.
- Test every exercise in the browser.
- Check the browser console for errors and warnings.
- Test the layout at 375px without horizontal scrolling.
- Test labels, semantic HTML, and accessible status messages.
- Test rapid squad switching and request cancellation in EX3.
- Capture screenshots of actual test results.
- Verify Git history using git log --oneline --graph.

## 4. Git Commit Policy

- Make small, task-focused commits.
- Use the exact required commit messages listed above.
- Review git status and git diff before committing.
- Do not include unrelated changes in a commit.
- Keep evidence consistent with the actual implementation.

## 5. Completion Status

Update this section only after verification.

- [ ] EX1 implemented and verified.
- [ ] EX2 implemented and verified.
- [ ] EX3 implemented and verified.
- [ ] Required Git commits verified.
- [ ] Responsive layout tested at 375px.
- [ ] Accessibility checks completed.
- [ ] AI failure audit completed.
- [ ] Final build successful.
