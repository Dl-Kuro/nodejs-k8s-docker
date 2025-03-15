
---

# 🚀 Guide d'Installation et de Déploiement

## 📌 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Docker](https://docs.docker.com/get-docker/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Git](https://git-scm.com/downloads)

Vérifiez que Minikube fonctionne avec :

```sh
minikube start
kubectl get nodes
```

---

## 📌 Installation Locale avec Minikube

### 1️⃣ Cloner le projet depuis GitHub

```sh
git clone <URL_GITHUB>
cd <nom_du_projet>
```

### 2️⃣ Démarrer Minikube

```sh
minikube start
kubectl create namespace mon-projet
kubectl config set-context --current --namespace=mon-projet
```

### 3️⃣ Déployer l'application sur Kubernetes

Déployer les fichiers YAML :

```sh
kubectl apply -f k8s/deployments/deployment.yaml
kubectl apply -f k8s/services/service-db.yaml
kubectl apply -f k8s/services/service-web.yaml
kubectl apply -f k8s/configs/configmap.yaml
kubectl apply -f k8s/configs/secret.yaml
kubectl apply -f k8s/storage/pvc.yaml
```

Vérifier que les pods sont bien en cours d'exécution :

```sh
kubectl get pods
```

---

## 📌 Accéder à l'Application Web

### 1️⃣ Accès via Minikube

Récupérer l'URL du service :

```sh
minikube service node-app-service --url
```

Copiez cette URL et ouvrez-la dans un navigateur.

### 2️⃣ Accès via port-forwarding

Si vous voulez rediriger un port local vers le service :

```sh
kubectl port-forward service/node-app-service 3000:3000
```

Puis testez dans un navigateur :

```sh
curl.exe -X GET http://localhost:3000/
```

---

## 📌 Tester l'API

### 🔹 Vérifier que l'application tourne

```sh
curl.exe -X GET http://localhost:3000/
```

✅ **Réponse attendue** :

```json
"Hello, Kubernetes!"
```

### 🔹 Vérifier la connexion à PostgreSQL

```sh
curl.exe -X GET http://localhost:3000/db
```

✅ **Réponse attendue** :

```json
{"time": {"now": "2024-03-03T12:34:56.789Z"}}
```

### 🔹 Ajouter un utilisateur

```sh
Invoke-WebRequest -Uri "http://localhost:3000/users" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"name": "Kevin"}'
```

✅ **Réponse attendue** :

```json
{"id": 1, "name": "Kevin"}
```

### 🔹 Récupérer tous les utilisateurs

```sh
curl.exe -X GET http://localhost:3000/users
```

✅ **Réponse attendue** :

```json
[{"id": 1, "name": "Kevin"}]
```

---

## 📌 Vérification et Debugging

### 🔹 Vérifier les logs

```sh
kubectl logs -l app=node-app
kubectl logs -l app=postgres-db
```

### 🔹 Vérifier les services et les ports exposés

```sh
kubectl get services
```

### 🔹 Tester la résilience (redémarrage d’un Pod)

```sh
kubectl delete pod -l app=postgres-db
kubectl get pods
```

Ensuite, vérifiez que les données sont toujours là :

```sh
curl.exe -X GET http://localhost:3000/users
```

---

## 🎯 Conclusion

✅ Votre application est maintenant déployée sur Kubernetes avec Minikube.  

---
