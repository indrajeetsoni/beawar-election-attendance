# 🗳️ Beawar District Election Training Attendance Management System
### (Nagar Palika & Panchayat Election - District Beawar, Rajasthan)

A feature-rich, high-performance web software designed for the **District Election Office, Beawar (Rajasthan)** to capture, manage, and report employee attendance during Nagar Palika and Panchayat election training sessions.

---

## 🌟 Key Features

1. **🔐 Multi-Role Authentication**:
   - **District Election Nodal Officer (Admin)**: Full control over master employee lists, reports, cloud sync settings, and data exports.
   - **Master Trainer / Attendance Officer**: Quick mobile-friendly interface for marking present/absent and scanning QR codes.

2. **📊 Excel Database Engine (SheetJS)**:
   - **Upload any `.xlsx`, `.xls`, or `.csv`** employee database directly in the browser.
   - Automatic column matching for English and Hindi column headers (`Emp ID`, `Name`, `Designation`, `Department`, `Tehsil`, `Mobile`, `Duty`, etc.).
   - Pre-loaded with **Beawar District Sample Database** (Beawar, Jaitaran, Masuda, Todgarh, Raipur, Badnor, Vijaynagar tehsils).

3. **📝 Attendance Capture with Reason Tracking**:
   - 1-Click **PRESENT** badge marking.
   - 1-Click **ABSENT** with mandatory **Valid Reason Selection**:
     - 🚑 Medical Emergency / Sick Leave
     - 📜 DEO Sanctioned Exemption
     - 🔄 Double Duty / Duplicate Order
     - 📍 Out of District / Transferred / Retired
     - 🚫 Unauthorized Absence (Flagged for DEO Show Cause Notice)
   - Exemption document/certificate reference number recording.

4. **📷 Integrated Camera QR Code / Barcode Scanner**:
   - Scan Employee ID card or Duty Order QR barcode to instantly locate and record attendance in < 2 seconds.

5. **📈 Real-Time DEO Analytics & Reports**:
   - Attendance percentage, Present/Absent ratios, Tehsil-wise breakdown, and Absentee reason distribution pie charts.
   - Export full attendance logs to **Excel (.xlsx)** formatted for District Magistrate / DEO Beawar.
   - Print/PDF formatted report generation.

6. **☁️ Dual Cloud Sync (Google Sheets & Firebase)**:
   - **Google Sheets Sync**: Real-time logging to Google Sheets via Apps Script webhook.
   - **Firebase Realtime DB Sync**: Configurable Firebase API endpoint for enterprise multi-user sync.
   - **Offline-First Storage**: Saves all attendance locally (LocalStorage) so no data is lost even without internet.

---

## 📁 Repository Structure

```
beawar-election-attendance/
├── index.html                   # Main Web Software (Full Client SPA)
├── beawar_sample_employees.csv  # Beawar District Sample Excel Database
├── google_appscript_backend.js  # Google Sheets AppsScript Backend Script
├── push_to_github.bat           # 1-Click GitHub Repository Upload Tool
└── README.md                    # System Documentation & Guide
```

---

## 🚀 How to Run & Deploy

### Method 1: Local / Mobile Browser (No Server Needed)
1. Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, Safari, or Firefox.
2. It works instantly on Desktop, Laptop, Android Phones, and Tablets!

### Method 2: Host Free on GitHub Pages
1. Create a repository on GitHub named `beawar-election-attendance`.
2. Double-click `push_to_github.bat` and enter your GitHub repository URL.
3. On GitHub, navigate to **Settings > Pages > Branch: main > Save**.
4. Your application will be live at `https://YOUR_USERNAME.github.io/beawar-election-attendance/`!

---

## 🔗 Connecting Google Sheets as Database

1. Open your Google Sheet.
2. Go to `Extensions > Apps Script`.
3. Open `google_appscript_backend.js` from this folder, copy all code, and paste it in Apps Script.
4. Click `Deploy > New Deployment > Web app`. Set access to **"Anyone"**.
5. Copy the generated Web App URL and paste it into the **Cloud Sync** tab inside the software!

---

## 🏛️ Government of Rajasthan - Election Department Standards
Designed according to the guidelines of the **Election Commission of India (ECI)** & **District Election Office, Beawar, Rajasthan**.
