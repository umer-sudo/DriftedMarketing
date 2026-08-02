# Deploying to a GoDaddy domain

The domain is registered at GoDaddy; hosting is open. So GoDaddy does one job —
DNS — and the app runs on a host that can execute Node. **Netlify** is the chosen
host; the steps below are written for it.

**Why not GoDaddy hosting itself:** the contact form is a Next.js Server Action and
OG cards render through `next/og`. Classic GoDaddy shared/cPanel hosting serves
static files and PHP, so both would break. Keeping the domain at GoDaddy and
pointing it elsewhere costs nothing and changes nothing about your registration.

---

## 1. Deploy the app

**https://app.netlify.com/start** → *Deploy with GitHub* → authorise → pick
`umer-sudo/DriftedMarketing-Revamp`.

Netlify signs you in with your existing GitHub account: no new password, no card.

- **Branch:** `claude/handoff-package-ready-styavn` (or `main` once it's merged)
- **Build command / publish directory:** leave them. `netlify.toml` sets
  `npm run build` and `.next`, and Netlify installs its Next.js runtime
  automatically.

Do **not** use `npm run build:static` here. Netlify runs Node, so the app deploys
with the real Server Action form. The static build exists only for hosts that can't.

You get a `*.netlify.app` URL in a minute or two. Open it and click through all ten
routes before touching DNS — once the domain switches, every problem is public.

Deploy previews and branch builds are set to `noindex` in `netlify.toml`, so they
can't compete with the real domain in search results.

## 2. Point the domain

In Netlify: **Site configuration → Domain management → Add a domain**, enter
`driftedmarketing.com`. Netlify then shows the exact DNS records.

**Use the values Netlify displays.** Netlify offers two routes:

- **Keep DNS at GoDaddy** (simpler, less to unwind): create the A and CNAME records
  Netlify gives you. The apex A record points at Netlify's load balancer; the value
  is shown in the dashboard.
- **Move nameservers to Netlify** (better apex handling, one more thing to migrate):
  replace GoDaddy's nameservers with Netlify's four. This moves *all* DNS for the
  domain, including MX — so if email runs on this domain, you must recreate those
  records in Netlify or mail stops.

Unless you have a reason to move nameservers, take the first option.

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | the IP Netlify shows |
| CNAME | `www` | `<your-site>.netlify.app` |

In GoDaddy: **My Products → Domain → DNS → Manage Zones**.

- **Delete the existing A record for `@`** — it currently points at the old site.
  This is the moment the old site stops serving. Note its value first so the change
  is reversible.
- Add the A and CNAME records above.
- Leave MX records alone. Deleting them breaks email on the domain, and that
  mistake is not obvious until someone tells you their message bounced.

Propagation is usually minutes, occasionally up to 48 hours. Netlify provisions the
Let's Encrypt certificate automatically once the records resolve — if HTTPS shows a
warning immediately after the switch, give it a few minutes before assuming it broke.

## 3. Set the origin

In Netlify: **Site configuration → Environment variables**

```
NEXT_PUBLIC_SITE_URL = https://your-real-domain.com
```

Then redeploy. Until you do, canonical tags, `sitemap.xml`, `robots.txt` and every
OG tag claim `driftedmarketing.com` — which is the default in `lib/config.ts` and
has never been confirmed as the real domain.

## 4. Before you cut over — the old site's URLs

You are replacing a site that already exists. Its URLs are about to 404, and search
engines will drop those pages rather than transfer their ranking history.

Collect the old URLs first:

- the old `sitemap.xml`
- Google Search Console → Pages
- `site:yourdomain.com` in Google
- the old host's access logs

Then map each to its nearest equivalent in `redirects()` in `next.config.ts`. There
is a commented example there. A 301 moves the history across; a 404 discards it.

Anything with no real equivalent is better left to the 404 page, which offers the
work index and the call.

## 5. After cutover

- [ ] All ten routes load over HTTPS on the real domain
- [ ] `https://domain/sitemap.xml` and `/robots.txt` show the real origin
- [ ] `https://domain/work/rss.xml` returns six items
- [ ] Paste a case URL into Slack or iMessage and confirm the OG card renders
- [ ] Submit the contact form — it should say delivery isn't configured until you
      add `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
- [ ] Email on the domain still works, if it did before
- [ ] Submit the new sitemap in Google Search Console

## If you can't or won't create a hosting account

`npm run build:static` produces a plain `./out` folder that any file host serves —
GoDaddy shared hosting over FTP, GitHub Pages, an S3 bucket, anything.

```bash
npm run build:static     # → ./out
```

Upload the contents of `out/` to the web root (`public_html` on cPanel). No Node,
no build step on the server, no configuration.

### What the static build gives up

| | Node build | Static build |
| --- | --- | --- |
| All ten routes | ✓ | ✓ |
| OG cards, sitemap, robots, RSS | ✓ | ✓ |
| Contact form | Server Action | Client POST to an external endpoint |
| Server-side validation | ✓ | ✗ — client only |
| Per-IP rate limiting | ✓ | Whatever the form provider gives you |
| Endpoint hidden from the browser | ✓ | ✗ — it ships in the JS |
| Redirects from old URLs | `next.config.ts` | Host config (`.htaccess` on cPanel) |
| Image optimisation | ✓ | ✗ — ship pre-sized AVIF |

To wire the form, set `NEXT_PUBLIC_FORM_ENDPOINT` to a Formspree or Web3Forms URL
before building. Both are free and need no backend. Leave it unset and the form
says so honestly rather than pretending to send — same contract as the Node build.

### GitHub Pages specifically

Pages on a **private** repo needs a paid GitHub plan. `DriftedMarketing-Revamp` is
private, so this route means either making it public or upgrading.

## Alternatives

Netlify and Cloudflare Pages both run Next.js properly and take the same DNS
approach as Vercel — and both let you sign in with your existing GitHub account, no
new password and no card. If Vercel blocked you at a payment or verification step,
try one of those before settling for the static build.

To stay entirely inside GoDaddy with the Node build intact, you need their VPS or a
plan with cPanel's "Setup Node.js App" — say the word and I'll write the PM2 and
nginx config.
