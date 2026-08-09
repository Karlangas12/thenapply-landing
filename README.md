# Then Apply — Landing Page

The public landing page for Then Apply, served at **`thenapply.dev`**. Static
HTML pages styled with Tailwind CSS via CDN — no framework, no bundler.
Product pages with their own pricing live under a subpath (e.g.
`/web-to-markdown/`); Cloudflare Pages resolves `<path>/index.html` for clean
URLs automatically.

**This is the only repository that serves `thenapply.dev`.** There is a
similarly-named `packages/landing/` inside the `motor3-boilerplate` monorepo,
but that one is a *different* Cloudflare Pages project
(`web-to-markdown-landing`) with only a `*.pages.dev` URL — it has never had
this domain attached. If you're looking for where to edit anything that ends
up on `thenapply.dev`, including the Terms of Service, it's here, not there.
(This confusion cost a full session to untangle once already — see
`motor3-boilerplate/DEUDA_TECNICA.md` §4.2 if you want the full story.)

## One exception to "no build step": the Terms of Service

`/terms` and `/terminos` are the one pair of pages that **do** have a build
step, because a legal document that drifts between its source and what's
published is a real risk, not a cosmetic one. `TERMS_OF_SERVICE.md` and
`TERMS_OF_SERVICE.es.md` are the source of truth; `terms/index.html` and
`terminos/index.html` are generated from them and then committed like any
other static file — Cloudflare Pages never runs the generator, it just serves
whatever's checked in.

**If you edit the ToS**, edit the Markdown, then regenerate and commit the
HTML together with it:

```bash
npm run build:tos
```

This uses only Node's built-in module system (`type: module`, no
dependencies to install) and **fails loudly** — refuses to write anything —
if the generated HTML would lose any text from the Markdown, or if the
Markdown uses a construct the (deliberately small) parser doesn't understand
(tables, numbered lists, raw HTML, unclosed `**bold**`/`` `code` ``, …). See
the comments at the top of `tos-render.mjs` for why it's built this way.

Run `npm test` (also dependency-free — `node --test`) before committing a ToS
change; it exercises the same anti-drift check plus a handful of regression
cases for the specific clauses in the current text (the liability cap, the
GDPR carve-out, the language clause).

There is deliberately **no GitHub Action or other automation** wired up for
this — see `motor3-boilerplate/DEUDA_TECNICA.md` §4.2 for why: adding a
cross-repository sync step was judged to be another instance of the same
class of silent-failure risk that caused the original problem, not a fix for
it. Running the generator and reviewing its diff is a manual step, on
purpose.

## Local preview

No dependencies, no install, for everything except the ToS build step above.
Serve the folder with any static file server, e.g.:

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
├── TERMS_OF_SERVICE.md          # ToS source of truth (English, reference text)
├── TERMS_OF_SERVICE.es.md       # ToS source of truth (Spanish translation)
├── tos-render.mjs               # Markdown → HTML generator, with the anti-drift check
├── tos-paginas.mjs              # Per-language page metadata for the generator
├── build-tos.mjs                # Run this after editing either ToS Markdown file
├── terms/index.html             # Generated — do not hand-edit, see above
├── terminos/index.html          # Generated — do not hand-edit, see above
├── tests/tos-render.test.mjs    # node --test, no dependencies
└── README.md
```

## Deploying to Cloudflare Pages

Cloudflare Pages itself has no build step to run — configuration stays
minimal, and that's deliberate. The ToS generator above runs locally, before
a commit; its output is checked in like any other file, so Pages has nothing
to build.

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
