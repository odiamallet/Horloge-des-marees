# Marée & Horloge — version web installable (iPhone)

Ce dossier contient une version installable sur l'écran d'accueil d'un
iPhone, directement depuis Safari — pas besoin de Mac, Xcode, ni App Store.

**Limite à connaître** : Apple n'autorise pas les apps web à créer de vrais
widgets d'écran d'accueil (WidgetKit). Cette version te donne l'app en
plein écran (comme une vraie app), avec fonctionnement hors-ligne, mais
sans widget.

## Contenu

- `index.html` — l'app elle-même
- `manifest.json` — nom, icônes, couleurs pour l'installation
- `sw.js` — service worker (permet de lancer l'app même sans connexion)
- `icon-*.png` — icônes à plusieurs tailles, générées depuis le cadran de l'app

## Étape 1 — Héberger ces fichiers quelque part

iOS exige que l'app soit servie via une vraie adresse **https://**, on ne
peut pas juste ouvrir le fichier HTML directement depuis le téléphone.
Le plus simple, gratuit, et sans compte technique compliqué :

1. Va sur **https://app.netlify.com/drop**
2. Crée un compte gratuit si demandé (email suffit)
3. **Glisse-dépose ce dossier entier** (`MareeHorloge-web`) sur la page
4. Netlify te donne une adresse du type `https://un-nom-aleatoire.netlify.app`
   — c'est ton lien d'installation, garde-le

(Alternative si tu préfères : GitHub Pages, Vercel — même principe.)

## Étape 2 — Installer sur l'iPhone

1. Ouvre **Safari** sur l'iPhone (⚠️ ça ne fonctionne qu'avec Safari, pas
   Chrome ni un autre navigateur sur iOS — Apple limite volontairement
   l'installation d'apps web au seul Safari)
2. Va sur l'adresse Netlify de l'étape 1
3. Appuie sur le bouton **Partager** (le carré avec la flèche vers le haut,
   en bas de l'écran)
4. Fais défiler et appuie sur **"Sur l'écran d'accueil"**
5. Confirme avec **"Ajouter"**

L'icône apparaît sur l'écran d'accueil, s'ouvre en plein écran sans barre
Safari, comme une vraie app.

## Étape 3 — Configurer

Comme sur la version Android : ouvre l'app, ajoute ta clé api-maree.fr dans
"Clé API", puis ajoute ta/tes plage(s) habituelle(s).

## Mise à jour

Si je te donne une nouvelle version plus tard, il suffit de re-déposer le
nouveau dossier sur la même page Netlify (ou de faire un nouveau drop) —
l'app installée sur l'iPhone se mettra à jour automatiquement à la
prochaine ouverture avec connexion (le service worker vérifie une nouvelle
version à chaque lancement).
