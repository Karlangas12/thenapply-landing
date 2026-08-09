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

`/terms`, `/terminos`, and each Product's Schedule are the pages that **do**
have a build step, because a legal document that drifts between its source
and what's published is a real risk, not a cosmetic one.

Since 9 August 2026 the ToS is split in two layers:

- **Master Terms** (`TERMS_OF_SERVICE.md` / `.es.md`) — generic terms that
  apply to every Product the Provider offers (definitions, licence,
  warranties, liability, governing law, …). Talks about "the Service" and
  "each Product", never names a specific product.
- **Product Schedule** (`products/<product>.md` / `.es.md`) — one per
  Product, incorporated into the Master Terms by reference (see the
  "Product" and "Schedule" definitions in section 1). Holds what's actually
  specific to that Product: its description, the form of Content it accepts
  and returns, its IP marks, and where to find its current plans, pricing,
  and quotas. Today there is one: `products/web-to-markdown.md`.

Why split it: a second Product would otherwise have forced a choice between
duplicating the entire Master Terms (drift risk on every future edit) or
writing one document that quietly stopped being generic (a "Terms of
Service" that only made sense for the first product). Adding a Product now
means adding one Schedule file pair and one entry in `tos-paginas.mjs` — the
Master Terms don't change.

`TERMS_OF_SERVICE.md`, `TERMS_OF_SERVICE.es.md`, and every file under
`products/` are the source of truth; `terms/index.html`, `terminos/index.html`,
and `terms/<product>/index.html` / `terminos/<product>/index.html` are
generated from them and then committed like any other static file —
Cloudflare Pages never runs the generator, it just serves whatever's checked
in.

**If you edit the ToS or a Product Schedule**, edit the Markdown, then
regenerate and commit the HTML together with it:

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
├── index.html                          # Home: hero, example output, product grid
├── web-to-markdown/
│   └── index.html                       # Product detail page: full pricing, API docs
├── TERMS_OF_SERVICE.md                  # Master Terms source of truth (English, reference text)
├── TERMS_OF_SERVICE.es.md               # Master Terms source of truth (Spanish translation)
├── products/
│   ├── web-to-markdown.md               # Web to Markdown Product Schedule (English)
│   └── web-to-markdown.es.md            # Web to Markdown Product Schedule (Spanish)
├── tos-render.mjs                       # Markdown → HTML generator, with the anti-drift check
├── tos-paginas.mjs                      # Page metadata: PAGINAS_TOS (master) + PAGINAS_PRODUCTOS (schedules)
├── build-tos.mjs                        # Run this after editing any ToS or Schedule Markdown file
├── terms/index.html                     # Generated — do not hand-edit, see above
├── terminos/index.html                  # Generated — do not hand-edit, see above
├── terms/web-to-markdown/index.html     # Generated Schedule page — do not hand-edit
├── terminos/web-to-markdown/index.html  # Generated Schedule page — do not hand-edit
├── tests/tos-render.test.mjs            # node --test, no dependencies
└── README.md
```

### Adding a new Product

1. Write `products/<product>.md` and `products/<product>.es.md` — see
   `products/web-to-markdown.md` as a template. Only what's specific to that
   Product goes here: description, Content format, IP marks, and a pointer to
   where its plans/pricing/quotas are published (not the figures themselves —
   see the note in that file about why).
2. Add one entry per language to `PAGINAS_PRODUCTOS` in `tos-paginas.mjs`.
3. Add the Product's name and a link to its Schedule in the short list near
   the top of `TERMS_OF_SERVICE.md` / `.es.md` (the one paragraph that
   mentions products by name in the Master Terms — everything else there
   stays generic on purpose).
4. Run `npm run build:tos` and `npm test`, then commit the generated HTML
   together with the Markdown.

Nothing else in the Master Terms should need to change.

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
