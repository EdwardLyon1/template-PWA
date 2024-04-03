const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(cookieParser());

const visitorCountFile = path.join(__dirname, 'visitorCount.txt');

app.use((req, res, next) => {
    if (!req.cookies['visited']) {
        fs.readFile(visitorCountFile, (err, data) => {
            let count = 0;
            if (!err) {
                count = parseInt(data.toString());
            }
            count++;
            fs.writeFile(visitorCountFile, count.toString(), (err) => {
                if (err) {
                    console.error("Failed to write visitor count", err);
                }
                res.cookie('visited', '1', { maxAge: 86400000, httpOnly: true });
                req.visitorCount = count;
                next();
            });
        });
    } else {
        fs.readFile(visitorCountFile, (err, data) => {
            req.visitorCount = err ? 0 : parseInt(data.toString());
            next();
        });
    }
});

app.get('/visitorCount', (req, res) => {
    res.json({ visitorCount: req.visitorCount });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
