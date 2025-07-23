import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';


// this is for the https set up for the project
//the flow is 
// 1️⃣ The browser asks the server: “Prove you are who you say you are — and let’s talk privately.”
// 2️⃣ The server sends back the public certificate.
// 3️⃣ The browser checks: “Do I trust this certificate?” (Is it signed by Let’s Encrypt, or another authority?)
// 4️⃣ If it trusts it, the browser encrypts a secret and sends it — which only the private key can decrypt.
// 5️⃣ From there, all traffic is encrypted.

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
    port: 5173,
  },
});