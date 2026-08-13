# TreatIQ

TreatIQ is a browser-based clinical treatment planning support page for drafting phased dental treatment plans and reviewing preliminary AI-assisted radiographic observations.

## Usage

- Open `/index.html` in a browser for local review, or deploy the repository as a static site.
- Use the built-in form to enter case details and generate a phased treatment plan draft.
- X-ray analysis and plan generation call the existing `/api/claude` Vercel serverless function, so production deployments should keep the current `api/` folder and `vercel.json`.

## Repository contents

- `index.html` — TreatIQ application entrypoint
- `api/claude.js` — serverless proxy for Anthropic requests
- `vercel.json` — static/API deployment configuration
