# 1. Image de base
FROM node:12

# 2. Créer un dossier de travail dans le conteneur
WORKDIR /usr/src/app

# 3. Copier uniquement package.json (pour installer les dépendances d'abord)
COPY package.json .

# 4. Installer les dépendances Node.js
RUN npm install

# 5. Copier le reste des fichiers de ton projet dans le conteneur
COPY . .

# 6. Exposer le port que ton application va utiliser
EXPOSE 3000

# 7. Commande pour démarrer l'application
CMD [ "npm", "start" ]
