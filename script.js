function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}
// Removed populateTableOptions function

// Removed submitOrder function

// Removed window.onload function to populate tables

function showSection(section) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(sec => {
        sec.style.display = 'none';
    });
    const activeSection = document.getElementById(section);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Formun varsayılan davranışını engeller

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const product = document.getElementById('product').value;
    const address = document.getElementById('address').value;

    alert(`Siparişiniz alındı!\n\nAd: ${name}\nTelefon: ${phone}\nÜrün: ${product}\nAdres: ${address}`);
    
    // Gerekirse burada form verilerini bir sunucuya göndermek için bir AJAX isteği ekleyebilirsiniz.
    this.reset(); // Formu sıfırlar
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Siparişleri almak için bir endpoint
app.post('/api/orders', (req, res) => {
    const { name, phone, product, address } = req.body;

    if (!name || !phone || !product || !address) {
        return res.status(400).json({ message: 'Tüm alanları doldurmanız gerekiyor!' });
    }

    const order = { name, phone, product, address, date: new Date().toISOString() };

    // Siparişleri bir dosyaya kaydet
    fs.appendFile('orders.json', JSON.stringify(order, null, 2) + ',\n', (err) => {
        if (err) {
            console.error('Sipariş kaydedilemedi:', err);
            return res.status(500).json({ message: 'Sipariş kaydedilemedi.' });
        }

        res.status(200).json({ message: 'Siparişiniz başarıyla alındı!' });
    });
});





