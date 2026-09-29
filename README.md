# Rohan Mandal portfolio

Run `npm install`, then `npm run dev`. `npm run build` produces the deployable `dist` folder.

# Run Docker 

docker run -d --name portfolio -p 3000:80 portfolio:v2

## Content and remaining assets

Edit `src/content.ts` for contact details, project URLs and hero assets. Statistics and achievements are the supplied prompt's content. No testimonials were supplied, so none are published. Project artwork is illustrative typography, not product screenshots.

The generated portrait assets used by the site are in `public/images`. Desktop text sits beside the portrait; mobile text sits below the face.

The cinematic hero keeps a fixed portrait while scrolling through text chapters after its loading screen.

The contact form opens the visitor's email app with their brief; it does not send or store enquiries on a server. Live project links and Instagram are omitted until supplied. Hosting has not been configured.

## Refinement pass

Project summaries and technologies are visible on the page. The navigation tracks the current section. Section reveals respect reduced motion, the marquee has an explicit pause control, and service panels animate without leaving collapsed content accessible. Opening a project dialog or mobile menu pauses smooth scrolling. The contact form includes a validated copy-brief fallback, and email/social links are visible in the contact section and footer.

Checked at a 390px mobile viewport: no horizontal overflow, menu navigation, project dialog keyboard dismissal and focus restoration, service expansion and marquee pause. The copy-brief action was checked with local test data; no email was sent. Production build passes.

The 360-degree portrait sequence, real project destination URLs, testimonials, and deployed-site canonical/Open Graph URLs remain dependent on assets or details that have not been supplied. No testimonials are fabricated.

## Design

The current design uses graphite/off-white colors, a soft portrait spotlight, bold uppercase sans-serif typography, slim navigation, pill CTAs, an asset-aware loading screen and a pinned introduction with three scroll-controlled headlines. The active hero component is `src/CinemaHero.tsx`.
