const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const LOG_FILE = path.join(__dirname, 'searches.txt');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/product') {
        const { name, price, discount } = parsedUrl.query;

        // Validation
        if (!name || !price || !discount) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end("Error: Please provide name, price, and discount in the URL.");
        }

        const originalPrice = parseFloat(price);
        const discountPercentage = parseFloat(discount);
        const finalPrice = originalPrice - (originalPrice * (discountPercentage / 100));

        // Logging
        const logData = `[${new Date().toISOString()}] Product: ${name} | Final Price: ${finalPrice}\n`;
        fs.appendFile(LOG_FILE, logData, () => {});

        // Professional HTML Response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <body style="font-family: sans-serif; display: flex; justify-content: center; padding-top: 50px; background: #f0f2f5;">
                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 300px;">
                    <h2 style="margin-top: 0; color: #1a73e8;">Invoice Details</h2>
                    <hr>
                    <p><strong>Product:</strong> ${name}</p>
                    <p><strong>Original:</strong> ₹${originalPrice}</p>
                    <p><strong>Discount:</strong> ${discountPercentage}%</p>
                    <h3 style="color: #28a745;">Total: ₹${finalPrice.toFixed(2)}</h3>
                </div>
            </body>
            </html>
        `);
    } else {
        res.writeHead(404);
        res.end("Use /product route");
    }
});
"http://localhost:8000/product?name=Smartphone&price=25000&discount=12"
// Yahan dhyan dein: 'server' small letters mein hai
server.listen(PORT);