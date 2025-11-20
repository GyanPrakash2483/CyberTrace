## CyberTrace

CyberTrace is a two-part OSINT (Open-Source Intelligence) workbench. A React + Vite client lets analysts correlate emails, phone numbers, and usernames, while a Flask backend fans out to verification APIs, scripted scanners, Google dork generation, and lightweight database searches. Use it only for authorized security research.

- Matrix-inspired UI with real-time status for every lookup
- Email/phone/username enrichment via Hunter, NumVerify, GHunt, Maigret, SocialScan, custom Playwright flows, and retailer login probes
- Bulk fake-username generation to uncover potential impersonators
- Voter-record lookup against the bundled `server/data/voterdb.json`
- Automatic Google dorks plus one-click reverse image and Facebook/Quora/Naam searches
- PDF/print exports for reporting

---

### Project Layout

```
/client    React 19 + Vite UI (Tailwind 4, lucide-react, react-mdr background)
/server    Flask 3 API layer, async scanners, CLI/Playwright integrations
```

The client hits the backend via `config.API_BASE_URL` (defaults to `http://localhost:5000`). Enable CORS is already configured on the server.

---

### Backend Capabilities (`server/`)

| Route | Method | Description | Upstream dependency |
| --- | --- | --- | --- |
| `/` | GET | API banner + advertised endpoints | — |
| `/health` | GET | Health probe with UTC timestamp | — |
| `/api/email-lookup` | POST | Hunter email verifier | `HUNTER_API_KEY`, Hunter API |
| `/api/email-scan` | POST | Async retailer/social probes (Amazon, Flipkart, GitHub, Instagram, Reddit, Twitter, Quora) | Playwright Firefox, custom scrapers |
| `/api/ghunt` | POST | Runs `ghunt email … --json` for Google profile intel | `ghunt` CLI, Google creds on host |
| `/api/phone-lookup` | POST | NumVerify lookup | `NUMVERIFY_API_KEY`, NumVerify API |
| `/api/phone-scan` | POST | Async retailer/social probes by phone | Playwright flows |
| `/api/username-lookup` | POST | Username existence + profile URLs | Playwright flows |
| `/api/maigret` | POST | Runs `maigret username --json simple` and filters domains | `maigret` CLI |
| `/api/socialscan` | POST | Runs `socialscan` to enumerate occupied handles | `socialscan` CLI |
| `/api/voter-db-search` | POST | Filters `data/voterdb.json` by name/district/ULB/ward | bundled JSON |
| `/api/dork-lookup` | POST | Generates Google dork queries + links | internal templates |

Request/response logging happens via Flask `before_request`/`after_request`.

---

### Frontend Highlights (`client/`)

- `App.tsx` renders the branded landing page, animated Matrix background, and `TargetForm`.
- `TargetForm.tsx` manages all lookup forms, orchestrates concurrent fetches, shows voter search, fake-username scans, progress bars, error states, and print/export logic.
- `components/Results.tsx` breaks down primary details (`EmailDetails`, `PhoneDetails`, etc.), offers Quora/Facebook buttons, Naam iframe, Maigret cards, and fake-account rollups.
- Styling relies on Tailwind 4 utility classes plus custom gradients defined inline.

---

### Prerequisites

- Node.js ≥ 18.18 (Vite 6 requirement)
- Python ≥ 3.10
- Firefox browser binaries for Playwright flows
- System packages needed by Playwright/ghunt/maigret/socialscan (see their docs)

External CLI tools the backend calls directly must be available on `$PATH`:

```bash
pipx install ghunt maigret socialscan   # or install into the venv
ghunt login                             # configure tokens before running the API
playwright install firefox              # once per machine
```

---

### Configuration

Create `server/.env` (loaded via `python-dotenv`):

```
HUNTER_API_KEY=your_hunter_key
NUMVERIFY_API_KEY=your_numverify_key
```

`client/src/config.ts` controls which backend URL the UI targets; update it when the Flask app runs somewhere other than `localhost:5000`.

---

### Local Development

1. **Backend**
   ```bash
   cd /home/gyan/src/CyberTrace/server
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   playwright install firefox
   python app.py
   ```

2. **Frontend**
   ```bash
   cd /home/gyan/src/CyberTrace/client
   npm install
   npm run dev -- --host
   ```

3. **Usage**
   - Visit the Vite dev server (usually `http://localhost:5173`).
   - Enter any combination of email/phone/username.
   - Use the voter search form for structured DB queries.
   - Export results via the on-page PDF buttons once scans finish.

---

### Testing & Quality

- Frontend lint: `npm run lint`
- Frontend build smoke test: `npm run build`
- Backend relies on the CLI integrations and JSON fixtures; add pytest coverage under `server/test/` if you expand logic.
- After code changes, run `read_lints` or the relevant linters before submitting.

---

### Data & Privacy Notes

- `server/data/voterdb.json` and `newdata.json` ship as demo data; swap them with sanctioned datasets for production.
- Many scanners rely on headless browser automation that mimics signup forms. Respect rate limits and the terms of service of every target platform.
- Only operate CyberTrace with explicit authorization; misuse may violate law and provider policies.

---

### Troubleshooting

- **Playwright errors**: ensure `playwright install firefox` ran inside the active environment and the host has GUI libraries/headless dependencies.
- **ghunt/maigret/socialscan failures**: confirm the commands run manually with the same user and that output paths (`reports/…`, `out.json`) are writable.
- **CORS issues**: verify `config.API_BASE_URL` matches the Flask origin (including protocol and port).
- **No voter results**: input at least one filter; the API demands a non-empty `name`, `district`, `ULB`, or `ward`.

---

Happy hunting—responsibly.

