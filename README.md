# Akshatra Bluewater Logistics (ABL)

An import/export company website with an independent React/Vite front end and FastAPI backend. The backend currently serves editable trade data from JSON. The front end loads its portfolio and destination content exclusively from the API, keeping data access ready to move to a database later.

## Project structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/          # HTTP routes
│   │   ├── data/         # File-backed sample data
│   │   ├── schemas/      # Validated API response models
│   │   ├── services/     # Data access and business logic
│   │   └── main.py       # FastAPI app and middleware
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/   # Page sections, trade detail pages and shared icons
    │   ├── services/     # API client
    │   ├── App.jsx
    │   └── styles.css
    └── package.json
```

## Run locally

### Backend

From `backend`:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API is available at `http://localhost:8000/api/trade-data`; interactive docs are at `http://localhost:8000/docs`.

### Front end

From `frontend`:

```powershell
npm install
npm run dev
```

The site runs at `http://localhost:5173`. To point the app at another API host, set `VITE_API_URL` to the API base path (for example, `https://api.example.com/api`).

## Updating trade content

Edit `backend/app/data/trade_data.json`. The `content` object holds the site title, navigation, all section headings and copy, accessibility labels, and detail-page labels. The `categories`, `markets` and `trade_insights` objects hold showcase data. Each trade category includes its overview, indicative routes, transport modes, handling notes and gallery entries. Set a gallery entry's `image` to a public image path when a photo is ready; leave it `null` to show the designed placeholder. The API validates the data against the response models in `backend/app/schemas/trade.py`; keep those in sync when changing the data shape.

Clicking a trade category opens a shareable detail page at `/trade/<category-id>`. Routes and logistics are illustrative and should be confirmed for each actual enquiry. When the API is unavailable, the website displays a loading/error state rather than substituting hard-coded content.

Trade portfolio and destination details are indicative and should be confirmed for each enquiry.
