# Client Deliverables

Artifacts we send to Amisha for review / sign-off.

## Files

| File | Purpose |
|---|---|
| `Move-and-Meditate-Client-Questions.pdf` | **Send this to Amisha.** Branded questionnaire covering every decision we need from her before the site is launch-ready. 23 pages, A4. |
| `questionnaire.html` | Source of the PDF. Edit this when questions change, then regenerate. |
| `screenshots/*.jpg` | Embedded shots used inside the PDF. Regenerate from the live dev site (see below). |
| `scripts/capture.mjs` | Headless-Chrome script that re-shoots the screenshots. |

## Regenerate the PDF

```bash
# 1. Start the dev server in another terminal
pnpm dev

# 2. (Re)capture screenshots — uses system Chrome via puppeteer-core
#    Install puppeteer-core once in a temp dir (~1MB, not added to package.json):
mkdir -p /tmp/pdf-gen && cd /tmp/pdf-gen
echo '{"type":"module","dependencies":{"puppeteer-core":"^24.0.0"}}' > package.json
pnpm install --silent
cp /Volumes/Work/amisha/move-and-meditate/client-deliverables/scripts/capture.mjs .
node capture.mjs

# 3. Compress PNGs to JPEGs (smaller PDF)
cd /Volumes/Work/amisha/move-and-meditate/client-deliverables/screenshots
for f in *.png; do
  sips -s format jpeg -s formatOptions 78 "$f" --out "${f%.png}.jpg" >/dev/null
done
rm -f *.png

# 4. Render PDF via headless Chrome
cd /Volumes/Work/amisha/move-and-meditate
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox \
  --print-to-pdf="client-deliverables/Move-and-Meditate-Client-Questions.pdf" \
  --no-pdf-header-footer --virtual-time-budget=5000 \
  "file://$(pwd)/client-deliverables/questionnaire.html"
```

## Notes

- The questionnaire's HTML uses the same brand tokens as the site (Cormorant + Jost fonts, warm cream palette).
- Screenshots are recaptured straight from the local dev server, so the PDF stays in sync with what the client sees.
- If Amisha asks us to add/remove a question, edit `questionnaire.html`, re-run step 4 only.
