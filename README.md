# 🪑 bookADesk — Desk Booking System via Slack

A lightweight desk booking system powered by **Google Apps Script**, with seamless **Slack integration** for daily/weekly notifications and direct booking via Slack.

---

## ✨ Features

- 📅 Book desks directly in Slack
- 🔔 Receive daily and weekly reminders
- 📊 Google Sheets backend to track and view bookings
- 🧠 Booking logic handled entirely via Google Apps Script
- ✅ Works without any external servers

---

## ⚙️ Tech Stack

| Component         | Technology                     |
|------------------|---------------------------------|
| Backend Logic     | Google Apps Script              |
| Data Storage      | Google Sheets                   |
| Slack Integration | Slack App (slash commands, modals, or buttons) |
| Notifications     | Apps Script time-based triggers |

---

## 🛠️ How It Works

1. A user runs `/bookdesk` in Slack.
2. Slack sends the interaction to the Google Apps Script Web App.
3. The script:
   - Parses the request
   - Validates desk availability
   - Updates the Google Sheet
4. A confirmation is posted back in Slack.
5. Daily and weekly scheduled messages are sent to Slack with summaries.

![Google Web UI](https://d3d2prueitotgu.cloudfront.net/Screenshot%202025-05-12%20at%2009.39.51.png)
![Google Sheets as CRUD db](https://d3d2prueitotgu.cloudfront.net/Screenshot%202025-05-12%20at%2009.46.53.png)
![Slack Integration](https://d3d2prueitotgu.cloudfront.net/Screenshot%202025-05-12%20at%2009.47.59.png)


---

## 🔧 Setup Guide

### 1. Set Up Google Sheet
Create a Google Sheet with:
- One tab for available desks (e.g. `Desks`)
- One tab for bookings (e.g. `Bookings`)

Share it with your Google Apps Script if needed.

### 2. Write and Deploy Google Apps Script
- Use the Apps Script editor
- Paste the backend logic (`Code.gs`)
- Deploy it as a **Web App**:
  - **Execute as**: yourself
  - **Who has access**: anyone (or restricted to domain)

### 3. Set Up Slack App
- Go to https://api.slack.com/apps → Create a new app
- Enable:
  - Slash Commands (`/bookdesk`)
  - Interactivity & Shortcuts (for buttons/modals)
- Set the Request URL to the Web App URL
- Install it to your Slack workspace

### 4. Time-based Notifications
- In Apps Script, add triggers to:
  - Send daily reminders (e.g. 9 AM every weekday)
  - Send weekly summaries (e.g. Friday 4 PM)

---

## 🧪 Example Interaction

Slack bot responds:
> 🪑 *Choose your desk for tomorrow*  
> [Pick Date] [Pick Desk]  
> ✅ "You're booked in for Desk 7 on Tuesday."

---

## 📌 Future Enhancements

- Slack modals for multi-day bookings
- Cancel/update booking command
- Admin view of full week
- Capacity limits / office zones

---

## 🙋‍♂️ Support

Need help or want to contribute? Ping Victor or open a pull request!

---

## 📄 License

MIT — use it, modify it, share it.# bookADesk
