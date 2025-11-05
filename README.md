````markdown
# Lab 7 – Containers with Docker

## Objectifs

1. Installer Docker  
2. Écrire un `Dockerfile` et construire une image Docker  
3. Exécuter un conteneur Docker avec différentes options  
4. Partager une image Docker avec un camarade  
5. Créer et exécuter une application multi-conteneurs avec Docker Compose  

---

## Liens utiles

- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Documentation Docker Compose](https://docs.docker.com/compose/)

---

## Ressources

**Dossier [`lab/hello-world-docker`](lab/hello-world-docker)**  
- `server.js` : application web Node.js "Hello World"  
- `package.json` : dépendances et configuration de l’app  
- `Dockerfile` : instructions de création du conteneur  

**Dossier [`lab/hello-world-docker-compose`](lab/hello-world-docker-compose)**  
- `server.js` : application web Node.js connectée à Redis  
- `dbClient.js` : gestion de la connexion à Redis  
- `package.json` : dépendances et configuration de l’app  
- `Dockerfile` : création du conteneur applicatif  
- `docker-compose.yaml` : configuration multi-conteneurs  

---

## 1. Installation de Docker

1. Installer [Docker Desktop](https://www.docker.com/get-started) selon votre système d’exploitation.  
2. Vérifier le bon fonctionnement de Docker :  
   ```bash
   docker run hello-world
````

---

## 2. Écriture du Dockerfile et création de l’image

1. Se placer dans le dossier `lab/hello-world-docker`.
2. Observer les fichiers `server.js`, `package.json` et `Dockerfile`.
3. Construire l’image Docker :

   ```bash
   docker build -t hello-world-docker .
   ```
4. Vérifier la présence de l’image :

   ```bash
   docker images
   ```

---

## 3. Exécution du conteneur Docker

1. Lancer le conteneur :

   ```bash
   docker run -p 12345:8080 -d hello-world-docker
   ```
2. Vérifier son exécution :

   ```bash
   docker ps
   ```
3. Accéder à l’application sur [http://localhost:12345](http://localhost:12345).
4. Consulter les logs :

   ```bash
   docker logs <CONTAINER_ID>
   ```
5. Arrêter le conteneur :

   ```bash
   docker stop <CONTAINER_ID>
   ```

---

## 4. Partage de l’image Docker

1. Modifier le message dans `server.js` (ex. ajouter votre nom).
2. Recompiler l’image avec un nouveau nom.
3. Créer un compte sur [Docker Hub](https://hub.docker.com/).
4. Taguer l’image :

   ```bash
   docker tag hello-world-docker <DOCKER_ACCOUNT>/<IMAGE_NAME>
   ```
5. Se connecter :

   ```bash
   docker login
   ```
6. Envoyer l’image :

   ```bash
   docker push <DOCKER_ACCOUNT>/<IMAGE_NAME>
   ```
7. Un camarade peut ensuite la récupérer :

   ```bash
   docker pull <DOCKER_ACCOUNT>/<IMAGE_NAME>
   docker run -p 12345:8080 -d <DOCKER_ACCOUNT>/<IMAGE_NAME>
   ```

---

## 5. Application multi-conteneurs avec Docker Compose

1. Vérifier que Docker Compose est installé.
2. Se placer dans `lab/hello-world-docker-compose`.
3. Compléter le fichier `docker-compose.yaml` pour utiliser votre image et un service Redis.
4. Lancer les conteneurs :

   ```bash
   docker compose up
   ```
5. Accéder à [http://localhost:5000](http://localhost:5000) et actualiser la page plusieurs fois.
6. Arrêter avec `CTRL + C`, puis supprimer les conteneurs :

   ```bash
   docker compose rm
   ```
7. Relancer et observer le comportement du compteur (données perdues).
8. Modifier le `docker-compose.yaml` pour conserver les données avec un volume Docker.

**Indice :** Redis stocke ses données dans `/data`. Consultez [Docker Volumes](https://docs.docker.com/storage/volumes/).

---

## Bonus

* Déployer WordPress et MySQL à l’aide de Docker Compose.

```
```
