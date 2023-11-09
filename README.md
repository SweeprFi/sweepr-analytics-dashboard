# Sweep Analytics

## Set up

-   Clone repo
-   Run `npm i`
-   Run `npm run start`
-   See `http://localhost:3000/`


[functions]
  external_node_modules = ["express"]
  node_bundler = "esbuild"
[[redirects]]
  force = true
  from = "/api/*"
  status = 200
  to = "/.netlify/functions/api/:splat"