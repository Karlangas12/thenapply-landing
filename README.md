# Then Apply — Landing Page

The public landing page for Then Apply. Static HTML pages styled with
Tailwind CSS via CDN — no framework, no build step, no bundler. Product pages
with their own pricing live under a subpath (e.g. `/web-to-markdown/`);
Cloudflare Pages resolves `<path>/index.html` for clean URLs automatically.

## Local preview

No dependencies, no install. Serve the folder with any static file server, e.g.:

```bash
npx serve .
```

Then open the printed local URL in your browser.

## Structure

```
thenapply-landing/
├── index.html                  # Home: hero, example output, product grid
├── web-to-markdown/
│   └── index.html               # Product detail page: full pricing, API docs
└── README.md
```

## Deploying to Cloudflare Pages

This site has no build step, so Pages configuration is minimal.

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages →
   Connect to Git**, and select this repository.
3. Build settings:
   - **Build command**: leave empty
   - **Build output directory**: `/`
4. Deploy. Cloudflare will give you a `*.pages.dev` URL.

## Connecting the `thenapply.dev` domain

`thenapply.dev` is already added to this Cloudflare account. To point it at
this site:

1. Open the Pages project you just created.
2. Go to **Custom domains → Set up a custom domain**.
3. Enter `thenapply.dev` (and `www.thenapply.dev` if you want the `www`
   variant too) and follow the prompts. Since the domain is already on
   Cloudflare, DNS records are added automatically — no manual CNAME/A
   record editing needed.
4. Wait for the certificate to provision (usually a few minutes), then
   verify the domain resolves to the new page.

No further configuration is required — there's no backend, no environment
variables, and no database for this project.
