/**
 * GOOGLE APPS SCRIPT FOR BEAWAR DISTRICT ELECTION ATTENDANCE PORTAL
 * Instructions:
 * 1. Open your Google Sheet where employee data and attendance will be stored.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any code in Code.gs and paste this entire code.
 * 4. Click 'Deploy' > 'New Deployment'.
 * 5. Select type: 'Web app'.
 * 6. Set 'Execute as': 'Me'.
 * 7. Set 'Who has access': 'Anyone'.
 * 8. Click 'Deploy', grant permissions, and copy the Web App URL!
 * 9. Paste the Web App URL into the 'Cloud Sync' settings of your Beawar Attendance App.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if header exists, if not create headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Emp ID", "Name", "Designation", "Department", 
        "Tehsil", "Mobile", "Training Batch", "Attendance Status", 
        "Absence Reason", "Remarks", "Marked By"
      ]);
    }

    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

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
        data.markedBy || "Trainer"
      ]);
      return responseJSON({ status: "SUCCESS", message: "Attendance synced to Google Sheet" });
    }

    if (data.action === "BATCH_SYNC") {
      var rows = data.records;
      for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        sheet.appendRow([
          timestamp, r.empId, r.name, r.designation, r.department,
          r.tehsil, r.mobile, r.batch, r.status, r.reason || "", r.remarks || "", r.markedBy || "Trainer"
        ]);
      }
      return responseJSON({ status: "SUCCESS", message: rows.length + " records synced to Google Sheet" });
    }

    return responseJSON({ status: "ERROR", message: "Unknown action" });
  } catch (err) {
    return responseJSON({ status: "ERROR", message: err.toString() });
  }
}

function doGet(e) {
  return responseJSON({ status: "ACTIVE", message: "Beawar Election Attendance Google Sync Engine is running." });
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
