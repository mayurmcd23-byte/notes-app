const express = require('express');
const cors = require('cors');

// 🔥 CouchDB connection (FIXED)
const nano = require('nano')('http://admin:1234@127.0.0.1:5984');

// 🔥 Use your database
const db = nano.db.use('notes_db');

const app = express();
app.use(express.json());
app.use(cors());


// =============================
// ➤ Add Note
// =============================
app.post('/add-note', async (req, res) => {
    try {
        const note = req.body;

        const response = await db.insert(note);
        res.send({
            message: "Note added successfully",
            data: response
        });

    } catch (err) {
        console.error("ADD ERROR:", err);
        res.status(500).send(err.message);
    }
});


// =============================
// ➤ Get All Notes
// =============================
app.get('/notes', async (req, res) => {
    try {
        const data = await db.list({ include_docs: true });

        const notes = data.rows.map(row => row.doc);

        res.send(notes);

    } catch (err) {
        console.error("FETCH ERROR:", err);
        res.status(500).send(err.message);
    }
});


// =============================
// ➤ Delete Note
// =============================
app.delete('/delete-note/:id/:rev', async (req, res) => {
    try {
        const { id, rev } = req.params;

        const response = await db.destroy(id, rev);

        res.send({
            message: "Note deleted",
            data: response
        });

    } catch (err) {
        console.error("DELETE ERROR:", err);
        res.status(500).send(err.message);
    }
});


// =============================
// ➤ Update Note
// =============================
app.put('/update-note/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // get old doc
        const oldDoc = await db.get(id);

        // merge new data
        const updatedDoc = {
            ...oldDoc,
            ...req.body
        };

        const response = await db.insert(updatedDoc);

        res.send({
            message: "Note updated",
            data: response
        });

    } catch (err) {
        console.error("UPDATE ERROR:", err);
        res.status(500).send(err.message);
    }
});


// =============================
// ➤ Server Start
// =============================
app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});


console.log("Auto deploy working 🚀");
