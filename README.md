# BoodschappenbeterFinal
# 🛒 Supermarkt Prijsvergelijker

Een moderne webapplicatie waarmee je prijzen kunt vergelijken van vier grote Nederlandse supermarkten: **Jumbo**, **Albert Heijn**, **Plus** en **Dirk**. De app helpt je om snel de goedkoopste supermarkt voor jouw boodschappenlijst te vinden op basis van uitgebreide productdata en slimme vergelijkingslogica. [file:2][file:4]

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-private-red)

## ✨ Belangrijkste functies

### 🔍 Producten zoeken en filteren
- Zoeken op productnaam in een grote dataset met tienduizenden producten. [file:4][file:6]  
- Filteren op categorieën zoals “Aardappelen, Groente En Fruit”, “Bier En Wijn”, “Zuivel, Eieren, Boter” en meer. [file:4][file:6]  
- Sorteren op verschillende manieren: alfabetisch, goedkoopste eerst of duurste eerst. [file:4]  

### 💰 Prijsvergelijking tussen supermarkten
- Per product zie je de prijs bij Jumbo, Albert Heijn, Plus en Dirk. [file:4][file:6]  
- De goedkoopste prijs wordt gemarkeerd met een indicator (`isCheapest`) en een rangnummer (`rank`). [file:4][file:6]  
- Overzichtelijke weergave op productkaart én op de detailpagina, met duidelijke kleuraccenten voor beste deals. [file:4]  

### 📝 Boodschappenlijsten
- Meerdere boodschappenlijsten aanmaken, hernoemen en verwijderen. [file:4]  
- Producten vanuit de zoekresultaten of detailpagina toevoegen aan een gekozen lijst. [file:4]  
- Per lijst automatisch de totaalprijs per supermarkt berekenen, inclusief beste supermarkt voor die lijst. [file:4]  
- Duidelijke weergave van producten die niet bij een bepaalde supermarkt beschikbaar zijn. [file:4]  

### 🛒 Winkelwagen
- Producten toevoegen aan een winkelwagen vanuit producten of boodschappenlijsten. [file:4]  
- Totaalprijs van de winkelwagen bekijken, met duidelijk vormgegeven overzichtskaart. [file:4]  
- Items eenvoudig verwijderen en directe feedback via een notificatiesysteem. [file:4]  
- Winkelwagen wordt opgeslagen in localStorage en blijft bewaard tussen sessies. [file:4]  

### 🎨 UX, toegankelijkheid en privacy
- Mobile-first ontwerp met responsive layout voor mobiel, tablet en desktop. [file:1][file:4]  
- Sticky header, bottom navigation en duidelijke focus-states voor toetsenbordgebruikers. [file:4]  
- Privacy-informatie via banner en dialoog; data (cart en lijsten) worden alleen lokaal in de browser opgeslagen. [file:4]  

---

## 🏗️ Technische details

### Tech stack
- **Framework**: Lit 3 (Web Components via `lit` en `LitElement`). [file:4]  
- **Build tool**: Vite 5 met scripts voor development, build en preview. [file:2]  
- **Virtualization**: `@lit-labs/virtualizer` voorbereid voor performante rendering van grote lijsten. [file:2]  
- **OCR-bibliotheek**: `tesseract.js` opgenomen als dependency voor mogelijke bon/afbeelding-verwerking in de toekomst. [file:2]  

### Projectstructuur


.
├── index.html                         # Instappunt van de app, laadt <supermarkt-app>
├── supermarkt-app.js                  # Hoofd LitElement component met logica en UI
├── products_grouped.json              # Gegroepeerde en opgeschoonde productdata
├── products_FINAL_WORKING_CLEANED.csv # Rauwe brondata (scrape/clean resultaat)
├── package.json                       # Projectmeta, scripts en dependencies
├── package-lock.json                  # Exacte dependencyversies
└── README.md                          # Projectdocumentatie
[file:1][file:2][file:3][file:4][file:6]

Datastructuur
JSON: products_grouped.json
Bevat per item:

name: productnaam.

category: categorie, bijvoorbeeld “Bier En Wijn”.

image: URL naar productafbeelding.

prices: array met prijsobjecten per supermarkt.

cluster_id: ID van de productcluster (bijv. varianten).
[file:6]

Voorbeeld:

json
{
  "name": "100 Watt - Blond 40 Watt - Fles - 330ML",
  "category": "Bier En Wijn",
  "image": "https://.../Products/...png",
  "prices": [
    { "supermarkt": "Plus", "prijs": 2.73 },
    { "supermarkt": "Jumbo", "prijs": 2.89 },
    { "supermarkt": "Dirk", "prijs": 2.92 },
    { "supermarkt": "Albert Heijn", "prijs": 3.04 }
  ],
  "cluster_id": 2
}
Tijdens het laden verrijkt de app deze prijzen met:

isCheapest: of dit de laagste prijs is.

rank: volgnummer voor de prijsrangschikking (1 = goedkoopst).
[file:4][file:6]

CSV: products_FINAL_WORKING_CLEANED.csv
Bevat de opgeschoonde brondata met kolommen zoals supermarkt, categorie, productnaam, prijs, prijs per eenheid, foto-URL en product-URL. [file:3]

Wordt gebruikt als basisbron; de app draait op de gegroepeerde JSON-versie. [file:3][file:6]

🚀 Installatie en gebruik
Vereisten
Node.js 16 of hoger. [file:2]

npm (meegeleverd met Node.js). [file:2]

Installeren
bash
# Dependencies installeren
npm install
[file:2]

Development server starten
bash
npm run dev
Start een Vite development server (standaard op http://localhost:5173). [file:2]

Productiebouw maken
bash
npm run build
Maakt een geoptimaliseerde productie-build in de dist/ map. [file:2]

Productiebouw previewen
bash
npm run preview
Start een lokale server om de productie-build te testen. [file:2]

💾 Data-opslag en privacy
Lokale opslag
De applicatie gebruikt localStorage voor:

shopping-cart: huidige winkelwagen. [file:4]

shopping-lists: aangemaakte boodschappenlijsten. [file:4]

Bij het starten van de app worden deze waarden ingeladen, daarna worden wijzigingen steeds opgeslagen zodat ze de volgende sessie weer beschikbaar zijn. [file:4]

Privacy
Alle gebruikersdata (cart en lijsten) blijven lokaal in de browser van de gebruiker. [file:4]

Er is een privacy-banner en -dialoog met uitleg over welke data wordt opgeslagen en hoe je deze kunt verwijderen. [file:4]

🔍 Functionaliteit in de UI
Views en navigatie
De app werkt rond één hoofdcomponent <supermarkt-app> met meerdere views: home, productDetail, cart en lists. [file:1][file:4]

Belangrijke UI-elementen:

Sticky header met zoekbalk en terugknop. [file:4]

Categorie-grid op de homepagina met iconen per categorie. [file:4]

Productgrid met kaarten, afbeelding, naam, “vanaf”-prijs en “beste prijs”-badge. [file:4]

Detailpagina met grote afbeelding, volledige prijsvergelijking en alternatieven. [file:4]

Winkelwagenweergave met items, prijs per item en totaalkaart. [file:4]

Boodschappenlijst-weergave met lijstkaarten, prijsvergelijking en detailoverzicht. [file:4]

Bottom navigatiebar met tabs voor Home, Lijsten en Winkelwagen. [file:4]

🔮 Mogelijke uitbreidingen
Mogelijke uitbreidingen op basis van de huidige setup:

Bonnen of schaplabels scannen met tesseract.js voor automatische productherkenning. [file:2][file:4]

Extra supermarkten toevoegen aan de dataset. [file:3][file:6]

Favorieten-/history-functie voor vaak gekochte producten. [file:4]

PWA-ondersteuning voor installatie op mobiel en offline gebruik. [file:2][file:4]

👨‍💻 Auteur
Mamoon – Student / Junior Developer

Project: Supermarkt prijsvergelijker / boodschappenlijst applicatie. [file:2][file:4]
voor installatie --> npm install --> npm run dev
