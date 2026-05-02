const express = require('express');
const cors = require('cors');
const nano = require('nano')('http://admin:1234@127.0.0.1:5984');

const app = express();
const db = nano.db.use('notes_db');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Notes App Running 🚀");
});

app.post('/add-note', async (req, res) => {
    try {
        const response = await db.insert(req.body);
        res.send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/notes', async (req, res) => {
    const data = await db.list({ include_docs: true });
    res.send(data.rows.map(row => row.doc));
});

app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
    console.log("Auto deploy working 🚀");
});
