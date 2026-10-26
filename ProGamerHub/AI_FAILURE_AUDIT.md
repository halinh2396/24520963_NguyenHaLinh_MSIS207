
# AI FAILURE AUDIT — ProGamer Hub

## Purpose

This document records potential AI-generated code failures,
their verification methods, and the engineering fixes.

Only mark a failure as reproduced after confirming it in the
actual code or through a repeatable test.

## Failure #01 — Redundant Derived State

### Potential AI mistake

An AI-generated component stores both the original list and a
filtered list in state, then synchronizes them using useEffect.

### Why it is a problem

The filtered list is derived from existing state. Synchronizing
it separately can cause redundant state updates and extra renders.

### Verification

- Inspect ScientistDirectory.jsx.
- Check whether useEffect is used only to synchronize filtered
  or sorted results.
- Test search and IQ filtering in the browser.

**Actual result:** [Record the result observed in your project.]

**Evidence:** [Add the real screenshot path or test reference.]

### Engineering fix

Calculate the visible list during rendering using filter()
and immutable toSorted(). Keep only independent inputs in state.

**Status:** [Not checked / Reproduced and fixed / Not reproduced]

---

## Failure #02 — Stale Closure in Async or Timer Logic

### Potential AI mistake

An AI-generated useEffect creates a timer or recurring callback
with an empty dependency array, even though the callback reads
a changing squadId.

### Why it is a problem

The callback may continue using an old squadId after the user
selects another squad.

### Verification

- Inspect PubgMatchTelemetry.jsx.
- Check effect dependencies.
- Switch rapidly between CES, TE, and GE.
- Verify that the final displayed result belongs to the selected
  squad.

**Actual result:** [Record the observed behavior.]

**Evidence:** [Add a real screenshot, test result, or code reference.]

### Engineering fix

Use the correct effect dependencies and clean up the timer or
request when dependencies change or the component unmounts.

**Status:** [Not checked / Reproduced and fixed / Not reproduced]

---

## Failure #03 — Missing AbortController or Cleanup

### Potential AI mistake

An AI-generated asynchronous request is not cancelled when
the selected squad changes or the component unmounts.

### Why it is a problem

An old request may finish late and attempt to update the UI.
This can cause stale results or misleading errors.

### Verification

- Inspect the telemetry service and useEffect cleanup.
- Confirm that each effect creates an AbortController.
- Confirm that cleanup calls controller.abort().
- Confirm that AbortError is ignored.
- Switch squads while a request is still loading.

**Actual result:** [Record the observed behavior.]

**Evidence:** [Add a real screenshot, test result, or code reference.]

### Engineering fix

Pass the AbortSignal to the asynchronous operation, abort the
previous operation in cleanup, and ignore intentional AbortError
exceptions.

**Status:** [Not checked / Reproduced and fixed / Not reproduced]

---

## Audit Summary

| Failure | Verified | Fixed | Evidence |
|---|---|---|---|
| Redundant derived state | Pending | Pending | Pending |
| Stale closure | Pending | Pending | Pending |
| Missing cancellation or cleanup | Pending | Pending | Pending |

## Final Verification

- [ ] At least three failures have been investigated.
- [ ] Actual behavior has been documented.
- [ ] Fixes have been tested where a failure was reproduced.
- [ ] Evidence refers to real project results.
- [ ] No unverified claim is presented as a confirmed bug.
