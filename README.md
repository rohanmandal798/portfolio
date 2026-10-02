# Rohan Mandal portfolio

Run `npm install`, then `npm run dev`. `npm run build` produces the deployable `dist` folder.

# Run Docker 

docker run -d --name portfolio -p 3000:80 portfolio:v2

## Content and remaining assets

Edit `src/content.ts` for contact details, project URLs and hero assets. Statistics and achievements are the supplied prompt's content. No testimonials were supplied, so none are published. Project artwork is illustrative typography, not product screenshots.

The generated portrait assets used by the site are in `public/images`. Desktop text sits beside the portrait; mobile text sits below the face.

The cinematic hero keeps a fixed portrait while scrolling through text chapters after its loading screen.

The contact form opens the visitor's email app with their brief; it does not send or store enquiries on a server. Live project links and Instagram are omitted until supplied. Hosting has not been configured.
