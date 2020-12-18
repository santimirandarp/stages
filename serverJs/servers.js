const express = require("express")
const app = express()
const https = require("https")
const http = require("http")
const fs = require("fs")
require("dotenv").config()

const {
  PEM_KEY, 
  PEM_CERT
} = process.env

const prodServer = () => {
  const httpsServer = https.createServer({
    key: fs.readFileSync(PEM_KEY),
    cert: fs.readFileSync(PEM_CERT)
  }, app);
 return httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  }) 
  
}

const devServer = (port) => {
 return app.listen( process.env.PORT || port, () => console.log(`listening at ${port}`)) 
}

module.exports = {
  devServer: devServer, 
  prodServer:prodServer 
}
