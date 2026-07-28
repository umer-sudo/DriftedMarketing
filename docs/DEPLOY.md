# Deploying to a GoDaddy domain

The domain is registered at GoDaddy; hosting is open. So GoDaddy does one job —
DNS — and the app runs on a host that can execute Node.

**Why not GoDaddy hosting itself:** the contact form is a Next.js Server Action and
OG cards render through `next/og`. Classic GoDaddy shared/cPanel hosting serves
static files and PHP, so both would break. Keeping the domain at GoDaddy and
pointing it elsewhere costs nothing and changes nothing about your registration.

---

## 1. Deploy the app

**https://vercel.com/new** → import `umer-sudo/DriftedMarketing-Revamp`.

Framework, build command and output directory are all auto-detected. Nothing to
configure. You get a `*.vercel.app` URL in about a minute.

Open it and click through all ten routes before touching DNS. Once the domain
switches, any problem is visible to the public.

## 2. Point the domain

In Vercel: **Project → Settings → Domains → Add**, enter the domain. Vercel then
shows you the exact DNS records to create.

**Use the values Vercel displays**, not values from a blog post — the apex IP has
changed more than once. As of writing it is typically:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | the IP Vercel shows |
| CNAME | `www` | `cname.vercel-dns.com` |

In GoDaddy: **My Products → Domain → DNS → Manage Zones**.

- **Delete the existing A record for `@`** — it currently points at the old site.
  This is the moment the old site stops serving. Note its value first so the change
  is reversible.
- Add the A and CNAME records above.
- Leave MX records alone. Deleting them breaks email on the domain, and that
  mistake is not obvious until someone tells you their message bounced.

Propagation is usually minutes, occasionally up to 48 hours. Vercel issues the TLS
certificate automatically once the records resolve.

## 3. Set the origin

In Vercel: **Settings → Environment Variables**

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

## Alternatives

Netlify and Cloudflare Pages both run Next.js and take the same DNS approach. If you
would rather stay entirely inside GoDaddy, you need their VPS or a plan with cPanel's
"Setup Node.js App" — say the word and I'll write the PM2 and nginx config instead.
