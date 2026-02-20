# How to run this app (econsult)

This is a **Vite + React** app. It must be run with the Vite dev server during development.

## Run for development

```bash
cd c:\xampp\htdocs\core_system\econsult
npm install
npm run dev
```

Then open in the browser the URL Vite prints, e.g. **http://localhost:5173**.

Do **not**:

- Open `index.html` via **file://** (double-click or drag into browser).
- Rely on **XAMPP** (e.g. `http://localhost/core_system/econsult/`) to run the **source** app — bare imports like `"react"` will not resolve and you will get MIME type or module errors.

## If you see "Failed to load module script... MIME type..."

- **MIME type "text/html"** or **MIME type ""** usually means the app is not being served by Vite (e.g. you opened it via XAMPP or file://).  
- **Fix:** Use `npm run dev` and open **http://localhost:5173**.

See **MIME-TYPE-ERROR-ANALYSIS.md** for a full analysis.
