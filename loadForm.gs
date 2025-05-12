function loadMainForm() {
  const htmlServer = HtmlService.createTemplateFromFile("main");
  const html = htmlServer.evaluate();
  html.setWidth(850).setHeight(600);
  // var widget = HtmlService.createHtmlOutput("<span style='text-align: center; color:#fc017c; font-size: 20px; font-weight: bolder;'>Delete or Amend your booking</span>");
  const userUI = SpreadsheetApp.getUi();
  userUI.showModalDialog(html, "Booking Manager");
}

function createMenu_() {
  const userUI = SpreadsheetApp.getUi();
  const menu = userUI.createMenu("Edit Booking");
  menu.addItem("Amend your booking", "loadMainForm");
  menu.addToUi();
}

function onOpen() {
  createMenu_();
}

function searchData(searchTerm) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Form Responses"); // Assuming your sheet name is "Form Responses"
  const dataRange = sheet.getRange("A2:H" + sheet.getLastRow()); // Assuming your data starts from row 2 and columns A to H
  const data = dataRange.getValues();
  const results = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    // Convert both search term and user name to lowercase for case-insensitive comparison
    if (row[0].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
      // Check if the user name contains the search term as a substring
      results.push(row[0] + " - " + row[2]); // Assuming the user name is in column A and the date is in column C
    }
  }
  return results;
}

function deleteBookingFromSheet(name, dateStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Form Responses"); // Assuming your sheet name is "Form Responses"
  const dataRange = sheet.getRange("A2:H" + sheet.getLastRow()); // Assuming your data starts from row 2 and columns A to H
  const data = dataRange.getValues();

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row[0] === name && row[2].toString() === dateStr) { // Assuming name is in column A and date is in column B
      sheet.deleteRow(i + 2); // Adjust index to account for header row
      console.log("row" + row.indexOf )
      SpreadsheetApp.alert("Booking deleted for " + name + " - " + formattedDate);
      return; // Exit function once the booking is deleted
    }
  }
}


function editBooking(name, dateStr, newDate) {
  //  console.log("This is the selected date", newDate)
  //   console.log("Name: " + name + ", Date: " + dateStr + ", New Date: " + newDate); // Check if parameters are received correctly
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Form Responses");
    const dataRange = sheet.getRange("A2:H" + sheet.getLastRow());
    const data = dataRange.getValues();

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row[0] === name && row[2].toString() === dateStr) {
            console.log("Found matching row"); // Check if the correct row is found
            sheet.getRange(i + 2, 3).setValue(newDate);
            console.log("Date updated successfully"); // Check if date is updated successfully
            return; // Exit the function after updating
        }
    }
    console.log("No matching row found"); // Log a message if no matching row is found
}


function saveBooking(name, dateStr, index) {
    var resultItem = document.getElementById("resultItem" + index);
    var newDate = resultItem.getElementsByClassName("dateWrap")[0].getElementsByTagName("input")[0].value;
    // console.log(resultItem, newDate)

    google.script.run.withSuccessHandler(function() {
        // Update the date in the UI
        var dateDiv = resultItem.getElementsByClassName("dateWrap")[0];
        dateDiv.textContent = newDate;
        console.log("New date", newDate)
        
        // Change the button text back to "Edit"
        var editButton = resultItem.getElementsByClassName("editCta")[0];
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editBooking(name, dateStr, index);
        };
    }).editBooking(name, dateStr, newDate);
}




