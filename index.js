const koa = require("koa");
const static = require("koa-static");
const mount = require("koa-mount");
const path = require("path");
const Router = require("@koa/router");
const cors = require("@koa/cors");
const route = new Router();
const register = require("./routes");
const fs = require("fs");
const aiPlugin = require("./.well-known/ai-plugin.example.json");

const inContainer = process.env.IN_CONTAINER || false;
const port = process.env.APP_PORT || 5000;
const domain = process.env.APP_DOMAIN || "localhost";

aiPlugin.api.url = aiPlugin.api.url.replace("{APP_PORT}", port);
aiPlugin.logo_url = aiPlugin.logo_url.replace("{APP_PORT}", port);

if (domain !== "localhost") {
  aiPlugin.api.url = `https://${domain}/public/openapi.yml`;
  aiPlugin.logo_url = `https://${domain}/public/logo.png`;
}

fs.writeFileSync(
  "./.well-known/ai-plugin.json",
  JSON.stringify(aiPlugin, null, 2)
);

register(route);

const app = new koa();

app.use(cors());
app.use(mount("/.well-known", static(path.join(__dirname, ".well-known"))));
app.use(mount("/public", static(path.join(__dirname, "public"))));
app.use(route.routes());

app.listen(inContainer ? 5000 : port, () => {
  console.log(`Server is running on port ${inContainer ? 5000 : port}`);
});
