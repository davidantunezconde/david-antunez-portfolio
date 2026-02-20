# GUIA DE DEPLOYMENT - David Antúnez Portfolio

## RESUM DE L'ARQUITECTURA

```
┌─────────────────────────────────────────────────────────────┐
│                    EL TEU DOMINI IONOS                       │
│                   (davidantunez.com)                         │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│   IONOS HOSTING     │         │     RAILWAY         │
│   (Frontend)        │         │   (Backend + DB)    │
│                     │         │                     │
│  - HTML/CSS/JS      │  ───►   │  - FastAPI Python   │
│  - React Build      │  API    │  - MongoDB          │
│  - Fitxers estàtics │ calls   │  - GRATUÏT          │
└─────────────────────┘         └─────────────────────┘
```

---

## PAS 1: GUARDAR EL CODI A GITHUB

### A Emergent:
1. Mira la part inferior de la pantalla de chat
2. Clica el botó **"Save to GitHub"** (icona de GitHub)
3. Connecta el teu compte de GitHub si no ho has fet
4. Crea un nou repositori anomenat: `david-antunez-portfolio`
5. Clica "Save"

Això crearà una còpia del codi al teu GitHub.

---

## PAS 2: CREAR COMPTE A RAILWAY (GRATUÏT)

### 2.1 Registrar-se:
1. Ves a: https://railway.app
2. Clica "Login" → "Login with GitHub"
3. Autoritza Railway

### 2.2 Crear nou projecte:
1. Clica "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Selecciona el repositori `david-antunez-portfolio`
4. Railway detectarà automàticament que és un projecte amb backend

### 2.3 Configurar el Backend:
1. Clica al servei creat
2. Ves a "Settings"
3. A "Root Directory" posa: `backend`
4. A "Start Command" posa: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### 2.4 Afegir MongoDB:
1. Clica "+ New" dins del projecte
2. Selecciona "Database" → "MongoDB"
3. Railway crearà una base de dades MongoDB gratuïta

### 2.5 Configurar Variables d'Entorn:
1. Al servei del backend, ves a "Variables"
2. Afegeix:
   - `MONGO_URL` = (copia la URL de MongoDB que Railway et dona)
   - `DB_NAME` = `davidantunez_portfolio`
   - `JWT_SECRET` = `una_clau_secreta_llarga_123456`

### 2.6 Obtenir URL del Backend:
1. Un cop desplegat, Railway et donarà una URL com:
   `https://david-antunez-portfolio-production.up.railway.app`
2. **GUARDA AQUESTA URL** - la necessitaràs pel frontend

---

## PAS 3: COMPILAR EL FRONTEND

### Al teu ordinador:

```bash
# 1. Clona el repositori
git clone https://github.com/EL_TEU_USUARI/david-antunez-portfolio.git
cd david-antunez-portfolio/frontend

# 2. Instal·la dependències
npm install

# 3. Crea fitxer .env.production amb la URL del backend de Railway
echo "REACT_APP_BACKEND_URL=https://LA_TEVA_URL_RAILWAY.up.railway.app" > .env.production

# 4. Compila per producció
npm run build
```

Això crearà una carpeta `build/` amb tots els fitxers estàtics.

---

## PAS 4: PUJAR FRONTEND A IONOS

### 4.1 Accedir a IONOS:
1. Ves a https://my.ionos.es
2. Entra al teu compte
3. Ves a "Hosting" → El teu pla "Hosting Plus"

### 4.2 Accedir per FTP:
1. A IONOS, busca les credencials FTP:
   - Servidor: `ftp.el-teu-domini.com`
   - Usuari: (el trobaràs al panell)
   - Contrasenya: (la trobaràs al panell)

2. Utilitza un client FTP com **FileZilla** (gratuït):
   - Descarrega: https://filezilla-project.org
   - Connecta amb les credencials

### 4.3 Pujar els fitxers:
1. Navega a la carpeta arrel del teu hosting (normalment `/` o `/htdocs`)
2. Puja TOT el contingut de la carpeta `build/`:
   - index.html
   - static/
   - manifest.json
   - etc.

### 4.4 Configurar .htaccess:
Crea un fitxer `.htaccess` a la carpeta arrel amb:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

---

## PAS 5: CONFIGURAR EL DOMINI

### Si vols usar el teu domini per tot:

**Opció A - Subdomini per l'API:**
1. A IONOS, crea un subdomini: `api.el-teu-domini.com`
2. Configura un CNAME que apunti a la URL de Railway

**Opció B - Deixar Railway amb el seu domini:**
- El frontend usarà `el-teu-domini.com`
- El backend usarà `xxx.railway.app`
- Ja està configurat així al codi

---

## PAS 6: CREAR USUARI ADMIN

Un cop tot estigui funcionant, necessites crear el teu usuari admin:

```bash
# Des del terminal, fes una petició POST:
curl -X POST "https://LA_TEVA_URL_RAILWAY.up.railway.app/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "davidantunezconde@gmail.com",
    "password": "LA_TEVA_CONTRASENYA"
  }'
```

---

## VERIFICACIÓ FINAL

Comprova que tot funciona:

1. ✅ Obre `https://el-teu-domini.com` - Ha de mostrar la web
2. ✅ Obre `https://el-teu-domini.com/admin/login` - Ha de mostrar el login
3. ✅ Entra amb les credencials que has creat
4. ✅ Verifica que pots afegir/editar projectes

---

## PROBLEMES COMUNS

### El frontend no carrega:
- Verifica que has pujat tots els fitxers del `build/`
- Verifica el fitxer `.htaccess`

### No connecta amb el backend:
- Verifica que la URL de Railway és correcta al `.env.production`
- Verifica que Railway està funcionant (verd al dashboard)

### Error CORS:
- Afegeix el teu domini a la configuració CORS del backend (server.py)

---

## CONTACTE SUPORT

Si tens problemes:
- Railway: https://railway.app/help
- IONOS: https://www.ionos.es/ayuda/

