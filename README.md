# Tech for Girls Community Registration

A modern registration form for the Tech for Girls Community, featuring WhatsApp sharing, screenshot upload, and Google Sheets integration.

## Features
- Registration form with validation
- WhatsApp sharing with counter
- Screenshot upload
- Google Sheets + Drive integration via Apps Script
- Single submission enforcement

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