# Dadok (Dataset Doktor)

> **Your automated data health diagnostic platform** — inspect, diagnose, and repair datasets with confidence.

**Dadok** is an intelligent data quality analysis and dataset repair platform that acts as a medical diagnostic tool for your datasets. Upload any dataset and receive a comprehensive health report, automated cleaning suggestions, and a repaired dataset ready for analysis.

---

## 🎯 Vision

Data scientists spend 60-80% of their time cleaning and inspecting datasets before analysis. Dadok automates this entire process, providing:

- Automated dataset profiling and anomaly detection
- Missing value analysis and structural validation
- Categorical normalization and type inference
- One-click dataset repair with transparency

**Built for:** Students, analysts, researchers, developers, and data scientists who need clean data fast.

---

## 📊 Development Progress

### ✅ Phase 1: MVP - In Progress

**Frontend (React + Vite + TailwindCSS)**
- ✅ Project structure setup with proper Tailwind configuration
- ✅ PrivacyPopup component (first-visit consent modal)
- ✅ UploadZone component (drag-and-drop with validation)
- ✅ Dashboard page (main landing page)
- ✅ Privacy page (privacy policy)
- ✅ Report page (analysis results display - skeleton)
- ✅ API service layer (ready for backend integration)
- ✅ React Router setup
- ⏳ HealthScoreCard component
- ⏳ CleaningPreview component
- ⏳ PlotlyVisualisations component

**Backend (FastAPI + Pandas)**
- ⏳ FastAPI setup
- ⏳ Upload endpoint (`/api/upload`)
- ⏳ Analysis endpoint (`/api/analyze`)
- ⏳ Report endpoint (`/api/report/{dataset_id}`)
- ⏳ Cleaning endpoint (`/api/clean`)
- ⏳ Download endpoint (`/api/download/{dataset_id}`)
- ⏳ Dataset profiler
- ⏳ Validator
- ⏳ Cleaner

**Database**
- ⏳ PostgreSQL setup (Supabase)
- ⏳ Schema migrations
- ⏳ Models

**Algorithms**
- ⏳ Outlier detection
- ⏳ Type inference
- ⏳ Fuzzy matching

**Legend:** ✅ Complete | ⏳ In Progress | ⬜ Not Started

---

## ✨ Core Features

### 📤 Dataset Upload
- **Supported formats:** CSV, XLSX, JSON
- **Upload limits:** 50MB max, 1M rows, 200 columns
- **Methods:** Drag-and-drop or file selection
- **Processing:** Temporary storage with automatic deletion

### 🔍 Automated Dataset Profiling

**Dataset-level metrics:**
- Row and column counts
- Inferred data types
- Unique and missing value counts
- Duplicate row detection

**Column-level statistics:**
- Min, max, mean, median, standard deviation
- Distribution skewness and kurtosis
- Most common values
- Missing value percentage

### 🏥 Data Quality Diagnostics

| Issue Type | Detection Method | Severity Levels |
|------------|------------------|-----------------|
| **Missing Values** | Count & percentage per column | Low (0-5%), Medium (5-20%), Critical (20%+) |
| **Duplicates** | Full row & key-based detection | Percentage + preview |
| **Type Errors** | Inference validation | Numeric contains text, etc. |
| **Format Inconsistency** | Pattern detection | Multiple date/number formats |
| **Category Issues** | String similarity clustering | "USA" vs "U.S.A" vs "United States" |
| **Outliers** | IQR, Z-score, Modified Z-score | \|z-score\| > 3 |
| **Constant Columns** | Unique value count | Single value across all rows |
| **High Cardinality** | Unique ratio analysis | Potential ID or noise columns |
| **Correlation** | Pearson correlation matrix | Highly correlated columns flagged |

### 🔧 Automated Cleaning Engine

**Available operations:**
- Remove duplicate rows
- Normalize categories using fuzzy matching
- Standardize date formats to ISO (YYYY-MM-DD)
- Impute missing values (mean, median, mode, forward/backward fill)
- Convert data types intelligently
- Remove corrupted rows (>50% invalid cells)

**Category standardization example:**
```
Before: male, Male, M, MALE
After:  Male
```

### 📊 Dataset Health Score

A comprehensive 0-100 scoring system:

```
Score = 100 
        - missing_penalty 
        - duplicate_penalty 
        - anomaly_penalty 
        - format_penalty 
        - inconsistency_penalty
```

**Score interpretation:**
- 90-100: Excellent ✅
- 70-89: Good 👍
- 50-69: Moderate ⚠️
- 30-49: Poor ⚠️⚠️
- 0-29: Critical 🚨

### 📈 Interactive Visualizations

Powered by Plotly:
- Distribution plots
- Box plots for outlier detection
- Correlation heatmaps
- Missing value heatmaps
- Categorical frequency charts

### 🔄 Before/After Comparison

Preview changes before downloading:
- Rows modified
- Rows removed
- Columns transformed
- Side-by-side comparison

### 💾 Export Cleaned Data

Download in multiple formats:
- CSV
- XLSX
- JSON

---

## 🏗️ Architecture

### System Overview

```
┌─────────────┐
│   Frontend  │ (React + TailwindCSS)
└──────┬──────┘
       │
┌──────▼──────┐
│ API Server  │ (FastAPI)
└──────┬──────┘
       │
┌──────▼──────────┐
│ Processing Queue│
└──────┬──────────┘
       │
┌──────▼────────────────┐
│ Data Analysis Engine  │ (Pandas/Polars)
└──────┬────────────────┘
       │
┌──────▼──────────┐
│ Report Generator│
└──────┬──────────┘
       │
┌──────▼──────┐
│   Storage   │ (PostgreSQL + Temp Files)
└─────────────┘
```

### Tech Stack

**Frontend:**
- Framework: React 18
- Build Tool: Vite
- Styling: TailwindCSS
- Routing: React Router v6
- Charts: Plotly.js + React-Plotly.js
- Deployment: Vercel (free tier)

**Backend:**
- Language: Python 3.11+
- Framework: FastAPI
- Data Processing: Pandas, Polars
- Validation: Pandera
- Statistics: NumPy, SciPy

**Infrastructure:**
- Backend Hosting: Render (free tier)
- Database: Supabase (PostgreSQL, free tier)
- CI/CD: GitHub Actions
- File Storage: Temporary local disk

---

## 🔐 Privacy & Security

### Privacy-First Architecture

**Core Guarantees:**
1. ✅ **Temporary Processing Only** — Datasets exist only during analysis
2. ✅ **Automatic Deletion** — Files deleted within 30 minutes
3. ✅ **No Dataset Retention** — Raw data never stored permanently
4. ✅ **No Data Sharing** — Never used for training or resale

### Data Lifecycle

```
User Upload → Temporary Storage → Analysis → Report Generation → AUTO-DELETE
                                                                  (30 min max)
```

### Privacy Features

- **Encrypted transmission:** All uploads over HTTPS
- **Secure IDs:** UUID-based dataset identifiers
- **Privacy consent popup:** Required before first use
- **Countdown indicator:** Shows time until auto-deletion
- **Private Mode:** Immediate deletion after analysis
- **Metadata only:** Database stores summaries, not raw data

### File Upload Security

**Allowed:** CSV, XLSX, JSON (max 50MB)  
**Rejected:** EXE, ZIP, PDF, scripts, binaries  
**Validation:** MIME type verification

---

## 🚀 API Design

### Endpoints

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/api/upload` | Upload dataset for analysis | ⏳ |
| POST | `/api/analyze` | Run quality diagnostics | ⏳ |
| GET | `/api/report/{dataset_id}` | Retrieve analysis report | ⏳ |
| POST | `/api/clean` | Execute cleaning operations | ⏳ |
| GET | `/api/download/{dataset_id}` | Download cleaned dataset | ⏳ |

---

## 📁 Project Structure

```
dadok/
├── frontend/
│   ├── charts/
│   │   └── PlotlyVisualisations.jsx        ⏳
│   ├── components/
│   │   ├── CleaningPreview.jsx             ⏳
│   │   ├── HealthScoreCard.jsx             ⏳
│   │   ├── PrivacyPopup.jsx                ✅
│   │   └── UploadZone.jsx                  ✅
│   ├── pages/
│   │   ├── Dashboard.jsx                   ✅
│   │   ├── Privacy.jsx                     ✅
│   │   └── Report.jsx                      ✅
│   ├── services/
│   │   └── api.js                          ✅
│   ├── src/
│   │   ├── App.jsx                         ✅
│   │   ├── index.css                       ✅
│   │   └── main.jsx                        ✅
│   ├── .env
│   ├── package.json
│   ├── postcss.config.js                   ✅
│   ├── tailwind.config.js                  ✅
│   └── vite.config.js                      ✅
│
├── backend/
│   ├── api/
│   │   ├── upload.py                       ⏳
│   │   ├── analyse.py                      ⏳
│   │   └── clean.py                        ⏳
│   ├── processing/
│   │   ├── profiler.py                     ⏳
│   │   ├── validator.py                    ⏳
│   │   └── cleaner.py                      ⏳
│   ├── algorithms/
│   │   ├── outlier_detection.py            ⏳
│   │   ├── type_inference.py               ⏳
│   │   └── fuzzy_matching.py               ⏳
│   └── validation/
│       └── schema_validator.py             ⏳
│
├── database/
│   └── migrations/
│       └── init_schema.sql                 ⏳
│
└── docs/
    ├── architecture.md                     ⏳
    └── algorithms.md                       ⏳
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- Git

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Important:** If styles don't appear after first run, ensure your `tailwind.config.js` includes:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",      // Components outside src/
    "./components/**/*.{js,ts,jsx,tsx}", // Components outside src/
  ],
  // ... rest of config
}
```

And your `postcss.config.js` has:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

After making config changes:
1. Stop the dev server (Ctrl+C)
2. Restart: `npm run dev`
3. Hard refresh browser: Ctrl+Shift+R

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 💰 Monetization Strategy

**Core service:** Free forever

**Revenue streams:**
1. **Ethical ads** — Google AdSense on dashboard (lightweight, non-intrusive)
2. **SEO traffic** — Optimized for searches like "clean CSV dataset", "dataset analyzer online"
3. **Public insights page** — Showcase "Top Dataset Issues This Week" to drive organic traffic

---

## 🛣️ Development Roadmap

### Phase 1: MVP ⏳ IN PROGRESS
- ✅ Frontend structure setup with Tailwind CSS properly configured
- ✅ Upload zone with drag-and-drop validation
- ✅ Privacy popup with consent tracking
- ✅ Dashboard page with hero section and feature showcase
- ✅ Privacy and Report page skeletons
- ⏳ Dataset upload backend endpoint
- ⏳ Basic quality diagnostics
- ⏳ Health score calculation
- ⏳ Simple cleaning operations

### Phase 2: Advanced Features
- ⬜ Interactive visualizations
- ⬜ Fuzzy category matching
- ⬜ Multiple imputation strategies
- ⬜ Before/after comparison

### Phase 3: Scale
- ⬜ Support for larger datasets (chunked processing)
- ⬜ API rate limiting
- ⬜ Advanced anomaly detection
- ⬜ Custom cleaning rules

### Phase 4: Intelligence
- ⬜ ML-based type inference
- ⬜ Predictive data quality scoring
- ⬜ Automated cleaning recommendations
- ⬜ Dataset insights engine

---

## 🌐 Deployment (Zero Cost)

| Service | Platform | Tier | Status |
|---------|----------|------|--------|
| Frontend | Vercel | Free | ⏳ Not deployed |
| Backend | Render | Free | ⏳ Not deployed |
| Database | Supabase | Free | ⏳ Not configured |
| CI/CD | GitHub Actions | Free | ⏳ Not configured |

**Total monthly cost:** $0

---

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

## 🇮🇩 About Dadok

**Dadok** (Dataset Doktor) — Your dataset's doctor for automated diagnostics and repair.

Built with ❤️ for the data community.

---

## 📝 Development Notes

### Latest Session Progress
- ✅ Created frontend structure with React + Vite + TailwindCSS
- ✅ Implemented PrivacyPopup component with localStorage consent tracking
- ✅ Implemented UploadZone component with drag-and-drop, file validation (CSV/XLSX/JSON, 50MB max)
- ✅ Created Dashboard page with hero section, features showcase, and "How It Works" section
- ✅ Set up API service layer ready for backend integration
- ✅ Configured React Router with Dashboard, Report, and Privacy pages
- ✅ **Fixed Tailwind CSS not applying:** Updated `tailwind.config.js` to scan components outside `/src/` folder
- ✅ **Fixed PostCSS:** Configured `postcss.config.js` with tailwindcss and autoprefixer plugins
- ✅ Frontend now renders properly with all styles applied

### Troubleshooting Note
If Tailwind styles don't appear, check that:
1. `tailwind.config.js` content array includes paths to ALL component folders (not just `/src/`)
2. `postcss.config.js` includes tailwindcss and autoprefixer plugins
3. Dev server is restarted after config changes
4. Browser is hard-refreshed (Ctrl+Shift+R)

### Next Steps
1. Create HealthScoreCard.jsx component
2. Create CleaningPreview.jsx component
3. Create PlotlyVisualisations.jsx for charts
4. Flesh out Report.jsx page with actual analysis display
5. Start backend development (FastAPI setup, upload endpoint)

---

**Ready to diagnose your data?** [Get Started →](#)