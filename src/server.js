require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Permet de lire le JSON dans les requêtes

// Connexion à PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Endpoint racine (test)
app.get('/', (req, res) => {
    res.send('Hello, Kubernetes!');
});

// Vérifier la connexion à PostgreSQL
app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ time: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer une table users (exécuté une seule fois)
app.get('/init', async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,name VARCHAR(100) NOT NULL)
        `);
        res.json({ message: 'Table users créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ajouter un utilisateur
app.post('/users', async (req, res) => {
    try {
        const { name } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
