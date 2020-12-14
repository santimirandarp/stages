const express = require("express")
const app = express()
const https = require("https")
const http = require("http")
const fs = require("fs")

const prodServer = () => {
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/mirandasites.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/mirandasites.com/fullchain.pem'),
}, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
}) 
return 1
}

const devServer = () => {
app.listen( process.env.PORT || 3000, () => console.log(`listening at 3000`)) 
  return 1
}
module.exports = {devServer:devServer, prodServer:prodServer}
