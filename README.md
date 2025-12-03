# ECE DevOps Lab 7 — Containers Docker pas-à-pas

Ce dépôt reprend les exercices du module [Docker Containers](https://github.com/adaltas/ece-devops-2025-fall/tree/main/modules/07.docker-containers/lab). 

---

## 0. Pré-requis

| Outil | Version conseillée | Vérification |
| --- | --- | --- |
| [Docker Desktop](https://www.docker.com/get-started) (ou Docker Engine + Compose plugin) | 24.x+ | `docker --version` |
| Docker Compose V2 (fourni avec Docker Desktop) | 2.x+ | `docker compose version` |
| [Git](https://git-scm.com/) | 2.x+ | `git --version` |

1. Installer les outils ci-dessus.
2. Redémarrer ta machine si c’est la première fois que tu actives la virtualisation/WSL2.
3. Vérifier que Docker fonctionne :
   ```bash
   docker run hello-world
   ```
   On doit voir un message “Hello from Docker!” avant de poursuivre.

---

## 1. Récupérer ce dépôt

```bash
git clone https://github.com/<ton-compte>/ece-devops-lab7.git
cd ece-devops-lab7
```

Structure utile :

```
lab/
├─ hello-world-docker/            
└─ hello-world-docker-compose/    
```

Toutes les commandes suivantes partent de la racine du dépôt (`ece-devops-lab7`).

---

## 2. Hello World avec Docker (`lab/hello-world-docker`)

Cette appli Node écoute sur le port 8080 et crée un fichier `data/visit-<timestamp>.txt` à chaque requête.

### 2.1 Construire l’image

```bash
cd lab/hello-world-docker
docker build -t hello-world-docker .
docker images | grep hello-world-docker
```

- `docker build -t … .` cherche le `Dockerfile` dans le dossier courant.
- La seconde commande confirme que l’image existe bien en local.

### 2.2 Lancer, tester et arrêter le conteneur

```bash
docker run -p 12345:8080 -d hello-world-docker
docker ps
```

1. Repèrer l’`CONTAINER ID` dans `docker ps`.
2. Ouvrir <http://localhost:12345> dans ton navigateur (ou `curl http://localhost:12345`).
3. Afficher les logs :
   ```bash
    docker logs <CONTAINER_ID>
   ```
4. Couper le conteneur :
   ```bash
   docker stop <CONTAINER_ID>
   ```

Chaque visite crée un fichier dans `lab/hello-world-docker/data`. On peut les lister avec `ls data`.

### 2.3 Personnaliser et partager l’image

1. Éditer `server.js` (changer le message envoyé).
2. Re-builder avec un nouveau tag Docker Hub :
   ```bash
   docker build -t <dockerhub>/hello-world-docker:v1 .
   ```
3. Se connecter à Docker Hub :
   ```bash
   docker login
   ```
4. Publier l’image :
   ```bash
   docker push <dockerhub>/hello-world-docker:v1
   ```
5. Demander à un·e camarade de tester :
   ```bash
   docker pull <dockerhub>/hello-world-docker:v1
   docker run -p 12345:8080 -d <dockerhub>/hello-world-docker:v1
   ```

---

## 3. Application multi-conteneurs (`lab/hello-world-docker-compose`)

Cette version compte le nombre de visites via Redis. Docker Compose orchestre deux services : `web` (Node) et `redis`. Le port externe est `5000`.

### 3.1 Construire (optionnel)

```bash
cd ../hello-world-docker-compose
docker compose build
```

`docker compose build` lit `docker-compose.yaml`, construit l’image `web` en local puis crée l’image Redis depuis Docker Hub.

### 3.2 Démarrer et interagir

```bash
docker compose up
```

- Attendre le log `Running on http://localhost:8080`.
- Ouvrir <http://localhost:5000> et rafraîchis plusieurs fois pour voir le compteur monter.
- Stopper les conteneurs avec `Ctrl+C`.

### 3.3 Nettoyer et tester la persistance Redis

```bash
docker compose rm
docker compose up -d
docker compose ps
open http://localhost:5000   # ou navigateur
docker compose down
```

- `rm` supprime les conteneurs arrêtés.
- Le volume `redis-data:/data` (déjà défini dans le fichier) garde le compteur même après `docker compose down`.
- Pour repartir de zéro, supprime le volume : `docker volume rm hello-world-docker-compose_redis-data`.

---

## 4. Bonus : WordPress + MySQL

Le fichier officiel se trouve [ici](https://github.com/adaltas/ece-devops-2025-fall/tree/main/modules/07.docker-containers/lab/wordpress). Pour tout récupérer et lancer :

```bash
mkdir -p ../wordpress
curl -o ../wordpress/docker-compose.yml https://raw.githubusercontent.com/adaltas/ece-devops-2025-fall/main/modules/07.docker-containers/lab/wordpress/docker-compose.yml
cd ../wordpress
docker compose up -d
```

- Accède à WordPress via <http://localhost:8000>.
- Identifiants MySQL configurés dans le compose : `wordpress` / `wordpress`.
- Pour arrêter : `docker compose down`.

---

## 5. Nettoyage global

Quand tu as terminé le TP, libère les ressources :

```bash
docker compose down --volumes --rmi local   # à lancer dans chaque dossier compose
docker rm -f $(docker ps -aq)               # supprime tous les conteneurs restants
docker rmi hello-world-docker               # supprime l'image de l'étape 2
docker image prune -f                       # supprime les images non utilisées
docker volume prune                         # supprime les volumes orphelins
```

---

## Références utiles

- Docs officielles : [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/), [Docker Compose](https://docs.docker.com/compose/).
- Cours : <https://github.com/adaltas/ece-devops-2025-fall/tree/main/modules/07.docker-containers>.
