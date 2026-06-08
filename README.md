# CV — Sven Spaltner

CV académique et artistique trilingue (FR / EN / DE), sobre, sans framework, généré depuis un fichier JSON unique. Optimisé pour l'impression.

---

**FR** — Pour modifier le contenu, éditer uniquement `cv.json`. Les PDFs des travaux sont à déposer dans `assets/pdf/`.

**EN** — To update content, edit `cv.json` only. PDF works go in `assets/pdf/`.

**DE** — Inhalte werden ausschließlich in `cv.json` bearbeitet. PDF-Arbeiten kommen in `assets/pdf/`.

---

## Structure

```
index.html
cv.css
cv.js
cv.json
assets/
  pdf/
  img/
```

## Entrée / Entry / Eintrag

```json
{
  "date_debut": "2024",
  "date_fin": null,
  "titre": "Titre",
  "sous_titre": "Description",
  "lien": "assets/pdf/fichier.pdf"
}
```

`date_fin: null` = date unique / single date / Einzeldatum  
`date_fin: ""` = en cours / ongoing / laufend

## Export PDF

Ctrl+P ou bouton d'impression en bas de page.

---

CC BY-NC-ND 4.0 — Sven Spaltner
