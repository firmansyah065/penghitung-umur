const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
});

// Route untuk menyimpan hasil ke file
app.post('/saveResult', (req, res) => {
    const result = req.body.result;
    const filePath = path.join(__dirname, 'hasil_perhitungan_umur_rinci.txt');

    fs.appendFile(filePath, result + '\n', (err) => {
        if (err) {
            console.error('Gagal menyimpan hasil:', err);
            return res.status(500).send('Gagal menyimpan hasil.');
        }
        res.sendStatus(200);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
