function updateWeeklyView() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var calendarSheet = ss.getSheetByName('Calendar');
  var weeklyViewSheet = ss.getSheetByName('Weekly View');
  
  // Clear existing data in Weekly View sheet starting from A2
  weeklyViewSheet.getRange("A2").clearContent();
  
  // Get all dates and names from D7 to H42
  var range = calendarSheet.getRange('D7:H42');
  var values = range.getValues();
  
  // Prepare data for Weekly View
  var data = '';
  
  // Weekdays
  var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Process each column of weekdays and names
  for (var column = 0; column < values[0].length; column++) {
    var weekday = weekdays[column];
    var columnNames = values.map(row => row[column]); // Names start from row 7
    
    // Remove desk types and empty cells, then add names to the weekly view data for this weekday
    var names = columnNames.map(name => {
      if (name) {
        return name.toString().replace(" - Double Screen", "")
                               .replace(" - Single Screen", "")
                               .replace(" - Hot Desk", "")
                               .trim();
      }
      return "";
    }).filter(name => name !== "");
    
    // If there are valid names for this weekday, add them to the weekly view data
    if (names.length > 0) {
      // Concatenate weekday and names, add a space after each weekday
      data += weekday + '\n' + names.join(', ') + '\n\n';
    }
  }
  
  // Update Weekly View with weekdays and concatenated names starting from A2
  if (data) {
    // Insert data into A2
    weeklyViewSheet.getRange("A2").setValue(data);
  } else {
    console.log("No valid data to update in Weekly View.");
  }
}
