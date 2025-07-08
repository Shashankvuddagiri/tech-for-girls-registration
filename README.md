# Tech for Girls Community Registration

A modern registration form for the Tech for Girls Community, featuring WhatsApp sharing, screenshot upload, and Google Sheets integration.

## Features
- Registration form with validation
- WhatsApp sharing with counter
- Screenshot upload
- Google Sheets + Drive integration via Apps Script
- Single submission enforcement

## Google Apps Script Backend Setup

1. Open [Google Apps Script](https://script.google.com/) and create a new project.
2. Copy the contents of `google-apps-script.js` from this repo into your Apps Script project.
3. Replace `'INSERT_YOUR_SHEET_ID_HERE'` with your Google Sheet's ID (found in the URL of your sheet).
4. Replace `'INSERT_YOUR_DRIVE_FOLDER_ID_HERE'` with the ID of the Google Drive folder where you want to store uploaded files.
5. Save and deploy the script as a Web App:
   - Click **Deploy > New deployment**.
   - Select **Web app**.
   - Set **Who has access** to "Anyone" (or "Anyone, even anonymous").
   - Copy the Web App URL and use it in your `config.js` as `APPS_SCRIPT_URL`.

## Configuration

Create a `config.js` file in the project root with the following content (replace the URL with your own if needed):

```js
// config.js
window.APP_CONFIG = {
  APPS_SCRIPT_URL: 'YOUR_APPS_SCRIPT_WEB_APP_URL'
};
```

**Important:** Add `config.js` to your `.gitignore` to avoid committing sensitive endpoints.

## Setup
1. Clone the repo
2. Create `config.js` as above
3. Open `index.html` in your browser
4. See `app.js` for configuration

## Deployment
- Enable GitHub Pages in repository settings (main branch) 