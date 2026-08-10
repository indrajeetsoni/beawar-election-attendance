/**
 * GOOGLE APPS SCRIPT FOR BEAWAR DISTRICT ELECTION ATTENDANCE PORTAL
 * 
 * Instructions:
 * 1. Open your Google Sheet (AttendanceTracker).
 * 2. Click Extensions > Apps Script.
 * 3. Replace all existing code with this updated code.
 * 4. Click 'Deploy' > 'New Deployment' (or 'Manage Deployments' > Edit > New Version).
 * 5. Set 'Select type': 'Web app'.
 * 6. Set 'Execute as': 'Me'.
 * 7. Set 'Who has access': 'Anyone'.
 * 8. Click 'Deploy', authorize, and copy the Web App URL!
 */

// Helper to find existing sheet tab case-insensitively or create it
function getOrCreateSheet(ss, targetName) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sName = sheets[i].getName().trim().toLowerCase();
    var tName = targetName.trim().toLowerCase();
    if (sName === tName || sName.replace(/\s+/g, '') === tName.replace(/\s+/g, '')) {
      return sheets[i];
    }
  }
  return ss.insertSheet(targetName);
}

// GET REQUEST: FETCH ALL EMPLOYEES AND USERS FROM GOOGLE SHEET TO APP
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. GET USERS FROM 'UserTracker' SHEET
    var userSheet = getOrCreateSheet(ss, "UserTracker");
    var userRows = userSheet.getDataRange().getValues();
    var users = [];
    if (userRows && userRows.length > 1) {
      for (var i = 1; i < userRows.length; i++) {
        var uRow = userRows[i];
        if (uRow[1] || uRow[2]) {
          users.push({
            name: String(uRow[1] || ''),
            username: String(uRow[2] || ''),
            password: String(uRow[3] || ''),
            role: String(uRow[4] || 'staff').toLowerCase().includes('admin') ? 'admin' : 'staff',
            assignedTehsil: String(uRow[5] || 'All Tehsils'),
            status: String(uRow[6] || 'Active')
          });
        }
      }
    }

    // 2. GET EMPLOYEES & ATTENDANCE FROM MAIN ATTENDANCE SHEET
    var empSheet = ss.getSheets()[0]; // First sheet (AttendanceTracker)
    var empRows = empSheet.getDataRange().getValues();
    var empMap = {};
    
    if (empRows && empRows.length > 1) {
      for (var j = 1; j < empRows.length; j++) {
        var row = empRows[j];
        var empId = String(row[1] || '').trim();
        if (!empId || empId === "Emp ID" || empId === "Timestamp") continue;
        
        // Latest row in sheet overwrites previous status for the same Emp ID
        empMap[empId] = {
          Emp_ID: empId,
          Name: String(row[2] || ''),
          Designation: String(row[3] || ''),
          Department: String(row[4] || ''),
          Tehsil_Block: String(row[5] || 'Beawar'),
          Mobile_No: String(row[6] || ''),
          Training_Batch: String(row[7] || 'Batch 1 (Hall A)'),
          Status: String(row[8] || 'Pending'),
          Absence_Reason: String(row[9] || ''),
          Remarks: String(row[10] || ''),
          MarkedBy: String(row[11] || '')
        };
      }
    }

    var employeeList = [];
    for (var id in empMap) {
      employeeList.push(empMap[id]);
    }

    return responseJSON({
      status: "SUCCESS",
      employees: employeeList,
      users: users,
      count: employeeList.length
    });
  } catch (err) {
    return responseJSON({ status: "ERROR", message: err.toString() });
  }
}

// POST REQUEST: WRITE / SYNC ATTENDANCE OR USER DETAILS FROM APP TO GOOGLE SHEET
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 1. SYNC USER ACCOUNTS TO 'UserTracker' SHEET
    if (data.action === "SYNC_USERS") {
      var userSheet = getOrCreateSheet(ss, "UserTracker");
      userSheet.clearContents();
      userSheet.appendRow([
        "Last Updated", "Full Name", "Username", "Passcode / Password", "Role", "Assigned Tehsil", "Status"
      ]);

      var users = data.users || [];
      for (var u = 0; u < users.length; u++) {
        var user = users[u];
        userSheet.appendRow([
          timestamp,
          user.name,
          user.username,
          user.password,
          user.role,
          user.assignedTehsil || "All Tehsils",
          user.status || "Active"
        ]);
      }
      return responseJSON({ status: "SUCCESS", message: users.length + " users synced to UserTracker sheet" });
    }

    // 2. ATTENDANCE DATA SYNC TO MAIN SHEET
    var sheet = ss.getSheets()[0];
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Emp ID", "Name", "Designation", "Department", 
        "Tehsil", "Mobile", "Training Batch", "Attendance Status", 
        "Absence Reason", "Remarks", "Marked By"
      ]);
    }

    if (data.action === "MARK_ATTENDANCE") {
      sheet.appendRow([
        timestamp,
        data.empId,
        data.name,
        data.designation,
        data.department,
        data.tehsil,
        data.mobile,
        data.batch,
        data.status,
        data.reason || "",
        data.remarks || "",
        data.markedBy || "Attendance Officer"
      ]);
      return responseJSON({ status: "SUCCESS", message: "Attendance synced to Google Sheet" });
    }

    if (data.action === "BATCH_SYNC") {
      var rows = data.records;
      for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        sheet.appendRow([
          timestamp, r.empId, r.name, r.designation, r.department,
          r.tehsil, r.mobile, r.batch, r.status, r.reason || "", r.remarks || "", r.markedBy || "Attendance Officer"
        ]);
      }
      return responseJSON({ status: "SUCCESS", message: rows.length + " records synced to Google Sheet" });
    }

    return responseJSON({ status: "ERROR", message: "Unknown action" });
  } catch (err) {
    return responseJSON({ status: "ERROR", message: err.toString() });
  }
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
