function sendToWebhook() {
  // Open the spreadsheet and get the sheets
  var calendarSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Calendar");
  var weeklyViewSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Weekly View");

  // Get the values from Calendar sheet (E7:E42)
  var peopleToday = calendarSheet.getRange("A2:A4").getValue();
  var wfhPeople = calendarSheet.getRange("B2:B4").getValue();

  // Get the values from Weekly View sheet (C2 and D2)
  var petsValue = weeklyViewSheet.getRange("C2").getValue();
  var monitorValue = weeklyViewSheet.getRange("D2").getValue();

  // Combine the values into an object
  var data = {
    people: peopleToday,
    pets: petsValue,
    graphicMonitor: monitorValue,
    wfh: wfhPeople
  };

  console.log(peopleToday, petsValue, monitorValue, wfhPeople);

  // Send the data to the webhook
  var url = "https://hook.eu2.make.com/xkjgmjef14m6iv2v55yf0fyesdhnivvs";
  var payload = JSON.stringify(data);
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  };

  UrlFetchApp.fetch(url, options);
}

