# Pro Handyman MD

Single-page lead generation website for a Maryland-based handyman service. Built with [Eleventy](https://www.11ty.dev/) and deployed on Netlify.

## Setup

```bash
npm install --include=dev
npm start        # dev server with live reload
npm run build    # production build → _site/
```

## Stack

- [Eleventy v3](https://www.11ty.dev/) — static site generator
- Nunjucks — templating
- Vanilla CSS + JS — no frameworks
- [Netlify Forms](https://www.netlify.com/products/forms/) — form processing
- Netlify — hosting

## Structure

```
src/
├── _data/site.js        # global data (current year)
├── assets/css/main.css  # styles
├── assets/js/main.js    # scripts
└── index.njk            # page template
```

## Deployment

Push to `main` → Netlify builds and deploys automatically.
