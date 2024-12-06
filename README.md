# Projet Nuit de l'Info 2024

Ce projet a été réalisé dans le cadre de la **Nuit de l'Info 2024** par l'équipe BDC. On vous souhaite une bonne navigation.

## Description du Projet

Notre application web propose une interface interactive et engageante combinant plusieurs fonctionnalités développées pour relever différents défis. Elle est construite avec React et Material-UI pour un rendu esthétique et ergonomique, tout en intégrant des éléments interactifs et ludiques.

### Fonctionnalités Principales :
- **CAPTCHA Interactif :** Un jeu pour valider l'accès à l'application. L'utilisateur doit compléter un mini-jeu avant de pouvoir explorer les autres fonctionnalités.
- **Parallax :** Une interface animée avec effet de parallax pour améliorer l'immersion.
- **Chasse au logo caché :** Une quête amusante pour retrouver un logo dissimulé dans l'interface.
- **Quiz à choix multiples (QCM) :** Un questionnaire interactif.
- **Contrôle audio :** Ajout de fonctionnalités de lecture/pause et réglage du volume pour un fichier audio intégré.
- **Design Responsif et Accessible :** Une mise en page adaptée pour une utilisation sur tous types d'appareils.

---

## Défis réalisés :

### 1. [Chasse au logo caché](https://www.nuitdelinfo.com/inscription/defis/468)
Nous avons implémenté un jeu consistant à trouver un logo dissimulé dans l'interface. Si trouvé, on affiche une animation et le logo se cache de nouveau en plus transparent et plus petit (Réussirez vous à trouver les 10 logos ?). Vous trouverez le code dans components/Logo.tsx .

### 2. [Code QR Pokémon](https://www.nuitdelinfo.com/inscription/defis/469)
Création d'un défi autour des QR codes Pokémon, permettant aux utilisateurs de scanner et interagir avec des informations en lien avec l'univers Pokémon.

### 3. [Bad UI Input](https://www.nuitdelinfo.com/inscription/defis/444)
Intégration de principes de **Dark UX**, proposant des interactions volontairement frustrantes pour sensibiliser à l'importance d'une bonne conception UX. Notre implémentation était un bouton volume qui quand activé montre un carré de couleur en gradient ainsi qu'une lettre entre R,G et B. Le volume sera modifié en appuyant sur un pixel du carré de couleur (On vous laisse deviner comment ça marche). Vous trouverez le code dans components/VolumeControl.tsx .

### 4. [CAPTCHA ludique](https://www.nuitdelinfo.com/inscription/defis/443)
Un CAPTCHA gamifié pour valider l'identité de l'utilisateur. Celui-ci doit résoudre un petit défi interactif composé de 4 niveaux ludiques avant d'accéder à l'application. Sachez que vous pouvez passer le CAPTCHA en cas de difficulté. Vous trouverez le code dans les fichiers components/Stage(...).ts ainsi que components/Captcha.tsx .

### 5. [API Météo](https://www.nuitdelinfo.com/inscription/defis/456)
Utilisation d'une API pour afficher des informations météorologiques dynamiques dans l'application. Selon l'état météorologique de Grenoble, le background de notre page principale va changer. Vous trouverez le code dans le document weatherApi.


Sachez que ces défis peuvent être activés depuis la Navbar.



