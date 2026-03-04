const { createServer } = require("http");
const fs = require("fs");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "0.0.0.0";
const port = Number.parseInt(process.env.PORT || "3000", 10);
const appDir = __dirname;

const app = next({ dev, hostname, port, dir: appDir });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Next app dir: ${appDir}`);
      const buildIdPath = path.join(appDir, ".next", "BUILD_ID");
      console.log(`> Build ID exists: ${fs.existsSync(buildIdPath)}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start Next.js server:", error);
    process.exit(1);
  });
