# General Designer — plain-language README

## What this is
A simple public website, the "studio" page of the General Designer. It is plain web pages with no server behind them.

## Who it's for
Visitors who want to see the General Designer's work.

## What it does today
- Shows a single web page (`index.html`, styled by `styles.css`).
- Its script (`app.js`) reads public GitHub projects to display them. Everything else on the page comes from the written text.

## How to run it
Open `index.html` in a browser, or start a small local web server:
```bash
python3 -m http.server 4173
```
then go to http://localhost:4173.

It is set up to be hosted on Vercel (`vercel.json`) as plain files.

## Current status and known gaps
- Live web address: not yet confirmed.
- What "General Designer" refers to (a person, a brand or a tool): not yet confirmed.

## Where things live
| File | What's in it |
|---|---|
| `index.html` | The page |
| `styles.css` | Look and feel |
| `app.js` | Loads GitHub projects onto the page |
| `vercel.json` | Hosting settings |
