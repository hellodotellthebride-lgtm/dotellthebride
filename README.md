# Do Tell The Bride Marketing Site

Opinionated Next.js 14 site for Do Tell The Bride featuring a marketing homepage inspired by the provided design along with an SEO-friendly blog powered by local Markdown content.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to explore the site. Blog articles live in `src/content/blog`. Add new `.md` files with front matter (`title`, `excerpt`, `coverImage`, `author`, `date`, `tags`) and they will appear automatically.

### Useful scripts

- `npm run dev` – start the Next.js dev server
- `npm run build` – create the production build
- `npm run start` – serve the production build locally
- `npm run lint` – run ESLint with the Next.js config

## Deploying to Firebase Hosting

1. Install the Firebase CLI if you have not already: `npm install -g firebase-tools`.
2. Authenticate and initialise Hosting in this folder:
   ```bash
   firebase login
   firebase init hosting
   # choose "Use an existing project" and answer "y" when asked about configuring as a single-page app.
   ```
3. When prompted, enable the web framework detection so Firebase can run `npm run build` and host `.next` correctly (`firebase experiments:enable webframeworks`).
4. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

The CLI will run the build, upload static assets and configure rewrites so both the marketing pages and the blog routes work behind Firebase Hosting.
