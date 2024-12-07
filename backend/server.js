require("dotenv").config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const paymentController = require('./src/controllers/paymentController');
const { processWebsites } = require('./src/services/enquiryService');
// create new express app and save it as "app"
const app = express();
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:4000",
        "https://admin.realtynivesh.com",
        "https://realtynivesh.com",
        "https://sushmagroup.realtynivesh.com",
        "https://themedallion.realtynivesh.com",
        "https://sushmagroup.realtynivesh.com/sushmabelleza"
    ],
    credentials: true
}));
// parse requests of content-type - application/json
app.use(express.json({ type: "application/json", limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// parse cookie from request.
app.use(cookieParser({})); // secure: false, domain: undefined 

// Serve Static Files
app.use("/uploads", express.static('public/uploads'));
app.all("/uploads/*", (req, res) => res.sendFile(path.resolve(__dirname, './public/uploads/img-not-found.png')));

// routes
app.get("/", async (req, res) => res.json({ status: true, message: "Api Working fine..!!" }));
app.get('/savedata-to-googlesheet', async (req, res) => {
    try {
        await processWebsites();
        res.status(200).json({ message: 'Data processed and sent to Google Sheets successfully.' });
    } catch (error) {
        console.error('Error processing websites:', error);
        res.status(500).json({ message: 'Error processing data.' });
    }
});

app.post('/payment-success', paymentController.handleSuccess);
app.post('/payment-error', paymentController.handleError);
app.use('/api-v1', require('./src/routes/index.routes'));



// Listen both http & https ports
const PORT = parseInt(process.env.PORT) || 9000;
const httpServer = http.createServer(app);

if (process.env.IS_HTTPS === 'true') {
    https.createServer({
        key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/fullchain.pem`),
    }, app).listen(PORT, () => console.log(`http Server is running on port ${PORT}.`));
} else {
    httpServer.listen(PORT, () => console.log(`https Server is running on port ${PORT}.`));
}

