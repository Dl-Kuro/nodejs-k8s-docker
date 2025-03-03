# Utilisation de l'image officielle Node.js
FROM node:18

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers de l'application
COPY package.json package-lock.json ./
RUN npm install

# Copie du reste des fichiers
COPY . .

# Exposition du port (ex: 3000)
EXPOSE 3000

# Lancement de l'application
CMD ["node", "server.js"]
