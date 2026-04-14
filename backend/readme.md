# 🚀 Dadok Backend - Quick Start Guide

## Step-by-Step Setup

### 1️⃣ Copy Backend Files to Your Project

Copy the entire `backend/` folder from this output to your Dadok project directory.

Your project structure should look like:
```
Dadok/
├── frontend/
├── backend/          ← New!
│   ├── api/
│   │   ├── __init__.py
│   │   ├── upload.py
│   │   └── analyse.py
│   ├── processing/
│   │   ├── __init__.py
│   │   ├── profiler.py
│   │   └── validator.py
│   ├── algorithms/
│   │   └── __init__.py
│   ├── validation/
│   │   └── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── .env
│   └── README.md
└── README.md
```

### 2️⃣ Install Python Dependencies

Open a terminal in the `backend/` directory:

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it (choose your OS)
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3️⃣ Start the Backend Server

```bash
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using WatchFiles
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 4️⃣ Test the API

Open your browser and visit:
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/health

### 5️⃣ Test File Upload (Using API Docs)

1. Go to http://localhost:8000/docs
2. Click on **POST /api/upload**
3. Click **"Try it out"**
4. Click **"Choose File"** and select a CSV/XLSX file
5. Click **"Execute"**
6. You'll get a response with `dataset_id`

### 6️⃣ Test Analysis

1. Copy the `dataset_id` from upload response
2. Go to **POST /api/analyze/{dataset_id}**
3. Click **"Try it out"**
4. Paste your `dataset_id`
5. Click **"Execute"**
6. You'll get a complete health report!

### 7️⃣ Connect Frontend

Make sure your `frontend/.env` has:
```env
VITE_API_URL=http://localhost:8000
```

Then start both servers:

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python main.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### 8️⃣ Test Full Flow

1. Open frontend: http://localhost:5173
2. Upload a dataset using the drag-and-drop zone
3. View the analysis report with health score!

---

## 📝 What's Working Now

✅ **File Upload**
- CSV, XLSX, JSON support
- File validation (size, type)
- Auto-delete timer (30 minutes)

✅ **Dataset Profiling**
- Row and column counts
- Data type inference
- Missing value analysis
- Unique value counts
- Statistical summaries for numeric columns
- Most common values for categorical columns

✅ **Data Quality Validation**
- Health score calculation (0-100)
- Missing value detection (with severity levels)
- Duplicate row detection
- Type inconsistency detection
- Outlier detection (IQR method)
- Constant column detection
- High cardinality detection

✅ **API Endpoints**
- `POST /api/upload` - Upload dataset
- `POST /api/analyze/{dataset_id}` - Analyze dataset
- `GET /api/report/{dataset_id}` - Get existing report
- `GET /api/datasets/{dataset_id}` - Get dataset metadata
- `DELETE /api/datasets/{dataset_id}` - Delete dataset

---

## 🔧 Troubleshooting

### "Module not found" error
Make sure you're running from the `backend/` directory:
```bash
cd backend
python main.py
```

### CORS errors in frontend
Your backend `.env` already has `CORS_ORIGINS=http://localhost:5173`, which should work.

If using a different port, update the `.env` file.

### Port already in use
Change the port in `backend/.env`:
```env
PORT=8001
```

Then update `frontend/.env`:
```env
VITE_API_URL=http://localhost:8001
```

---

## 🎯 Next Steps (Phase 2)

After testing the current backend, we can add:

1. **Data Cleaning Operations**
   - Remove duplicates
   - Fill missing values
   - Type conversion
   - Category standardization

2. **Download Cleaned Data**
   - CSV export
   - XLSX export
   - JSON export

3. **Before/After Comparison**
   - Show changes preview
   - Highlight modified cells

4. **Advanced Features**
   - Fuzzy category matching
   - Multiple imputation strategies
   - Custom cleaning rules

---

## 📚 Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Pandas Docs**: https://pandas.pydata.org/docs/
- **API Interactive Docs**: http://localhost:8000/docs (when server is running)

---

**Ready to diagnose your data? Start the backend and upload your first dataset!** 🎉