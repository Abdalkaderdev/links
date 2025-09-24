# Real House Company — Link in Bio

A minimal link-in-bio landing page for Real House Company, built with plain HTML and CSS.

## Preview
Open `index.html` in your browser locally, or deploy to a static host (GitHub Pages, Vercel).

## Project Structure
- `index.html` — Markup for the page
- `style.css` — Styles (clean, centered card, blue buttons)
- `logo.png` — Placeholder logo (replace with your real logo)

## Local usage
Just open `index.html` in any modern browser.

## Deployment

### Deploy to GitHub Pages
1. Create a new GitHub repository (e.g., `real-house-link-in-bio`).
2. Initialize git, commit, and push (see steps below).
3. In the GitHub repo, go to Settings → Pages.
4. Under "Build and deployment", set:
   - Source: Deploy from a branch
   - Branch: `main` and root `/` folder
5. Save. After a minute, your site will be available at `https://<your-username>.github.io/real-house-link-in-bio/`.

### Deploy to Vercel
1. Go to `https://vercel.com` and sign in.
2. Click "Add New…" → "Project", then "Import Git Repository".
3. Select your GitHub repo.
4. Framework preset: Other (static). Output directory: `/` (root).
5. Deploy. Vercel will give you a live URL and you can add a custom domain.

## Git setup and first push
Run these commands in the project directory:

```bash
git init
git add .
git commit -m "chore: initial commit for Real House link-in-bio"
git branch -M main
# Replace <your-username> with your GitHub username
git remote add origin git@github.com:<your-username>/real-house-link-in-bio.git
# or using HTTPS
# git remote add origin https://github.com/<your-username>/real-house-link-in-bio.git

git push -u origin main
```

## Customization
- Replace `logo.png` with your actual logo (keep the same filename or update `index.html`).
- Edit the link URLs or add more links in the `<nav>` of `index.html`.
- Adjust colors in `style.css` as needed.
