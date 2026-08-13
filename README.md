# TreatIQ

AI-assisted **dental treatment planning support** for clinicians.

TreatIQ helps structure case information into a phased treatment plan document that can be reviewed, refined, and presented by a licensed dental professional.

## Important Clinical Notice

TreatIQ is a **decision-support and educational tool only**.

- It does **not** diagnose, prescribe, or replace professional clinical judgment.
- All generated outputs must be independently reviewed, verified, and approved by a qualified dentist.
- Any AI-generated radiographic observations are preliminary and must be confirmed against original images.
- Literature references are informational only; applicability to an individual patient remains the clinician’s responsibility.
- No guarantee is made regarding accuracy, completeness, or clinical outcomes.

## Features

- Structured phased treatment plan generation:
  - Immediate Priority
  - Stabilisation
  - Rehabilitation
  - Aesthetics & Optimisation
- Optional AI-assisted radiographic observation drafting (for clinician review)
- Supporting literature lookup from indexed sources (PubMed)
- Print / Save as PDF output for case discussion

## Tech Stack

- HTML
- CSS
- JavaScript
- Deployed on Vercel

## Project Structure

- `index.html` — main TreatIQ application entrypoint
- `api/` — backend/API proxy logic (if configured)
- `vercel.json` — Vercel deployment configuration

## Local Development

Because this is a static web app, you can run it with any local static server.

Example using Python:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deployment (Vercel)

This repository is intended for Git-connected Vercel deployment:

1. Push changes to the production branch (e.g. `main`)
2. Vercel auto-deploys the latest commit
3. If needed, redeploy from Vercel Deployments with cache disabled

## Branding Notes

This repository is branded as **TreatIQ**.  
Legacy DentaFlow references should be removed from active UI and documentation.

## License

Proprietary / internal use unless otherwise specified by the repository owner.
