# Life OS v1.5 — Modular Home + Auth + App

This package combines the pre-login marketing website, local demo authentication, and the existing Life OS application in one Vite/React project.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Vite writes the production build to `dist/`.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: project root (the directory containing `package.json`)

## Modular source structure

```text
src/
├── App.jsx
├── main.jsx
├── styles.css
├── components/
│   ├── Common.jsx
│   ├── PublicHeader.jsx
│   └── PublicFooter.jsx
├── data/
│   └── seed.js
├── utils/
│   └── storage.js
└── pages/
    ├── public/
    │   ├── PublicSite.jsx
    │   ├── LandingPage.jsx
    │   ├── AuthPage.jsx
    │   ├── InfoPage.jsx
    │   ├── PricingPage.jsx
    │   ├── BlogPage.jsx
    │   └── DemoPage.jsx
    └── app/
        ├── HomeDashboard.jsx
        ├── Modules.jsx
        └── UtilityPages.jsx
```

## Clickable pre-login experience

The landing-page navigation and CTAs now open real in-app screens for:

- Features
- How It Works
- For Families
- Security
- Pricing
- Blog
- Login
- Registration
- Watch Demo
- Feature Learn More cards
- AI Builder demo

## Clickable signed-in experience

Home quick-access buttons now open working screens for documents, medicines, expenses, reminders, home inventory, bills, shopping list, and family.

## Authentication note

Authentication remains an MVP/browser demo using localStorage, matching the uploaded source. Replace it with backend authentication before production use.

## Life OS promo video

The public landing page and Demo page now use a reusable `src/components/PromoVideo.jsx` component.

Video assets are local and deploy with the Vite build:
- `public/media/lifeos-demo.mp4`
- `public/media/lifeos-demo-poster.jpg`

The video uses English spoken narration plus subtle instrumental background music. It does not autoplay with sound; users start playback deliberately, which is more reliable across browsers and mobile devices.

## Promo video update (v1.7)
The website now embeds the latest fully branded Life OS promo at `public/media/lifeos-demo.mp4`.
It includes the fitted opening logo, in-video top-right branding, closing logo card, English narration, and instrumental background music.

Cloudflare Pages settings:
- Build command: `npm run build`
- Build output directory: `dist`


## v1.8 branding fix
A single shared `LifeOSLogo` component now uses `/public/brand/lifeos-logo.png` across the app. The favicon is also generated from the same brand artwork.

## v1.8.1 build fix

Fixed Cloudflare/Vite parse error caused by `LifeOSLogo.jsx` importing itself:

`import LifeOSLogo from "./LifeOSLogo";`

The shared component now only declares and exports `LifeOSLogo`, while consuming components import it normally.

## v1.8.2 prominent authentication branding

- Login and registration now show the complete Life OS logo prominently above the form.
- Added `public/brand/lifeos-logo-auth.png`, a tightly fitted version of the same approved logo with unnecessary outer whitespace removed.
- The auth logo scales responsively: large on desktop and safely contained on mobile.
- Public header/dashboard branding remains compact.


## v1.8.3 navigation and branding
- Removed Blog from public header/footer and related public navigation.
- Increased the Life OS wordmark responsively across desktop, tablet, and mobile.

## v1.8.4 messaging update
Public positioning now uses:
- "Your whole life. One smart place."
- "Your life. Your needs. Your own smart space."
- "Organize what matters, create what you need, and let AI help you stay one step ahead."
The embedded promo end card uses the same language.


## v1.9 Travel AI Builder end-to-end demo
The interactive demo now tells one complete Life OS story:
1. User describes a Goa trip.
2. AI creates a Travel Space.
3. User manages flight, hotel, budget, packing and itinerary.
4. A flight delay demonstrates AI-assisted itinerary adaptation.
5. User captures an expense and a travel highlight.
6. Life OS creates a Travel Journal after the trip.
7. The completed trip and journal appear in the user's My Life portal.

All demo interactions are browser-local sample state and do not require a backend.
