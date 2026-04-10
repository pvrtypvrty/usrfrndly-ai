# USRFRNDLY.AI

One studio. 221+ AI models. Generate images, videos, lip sync, and cinematic shots — all from one interface.

Powered by [muapi.ai](https://muapi.ai) engine.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Your site is live at `your-project.vercel.app`

**Custom domain:** In Vercel dashboard → Settings → Domains → Add `usrfrndly.ai`

## Deploy to Netlify

1. Push to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. "Add new site" → Import from Git
4. Build command: `npm run build`
5. Publish directory: `dist`

## How It Works

- Users enter their own [muapi.ai](https://muapi.ai) API key (stored in localStorage)
- All generation requests go directly from the browser to `api.muapi.ai`
- No backend needed — this is a fully static site
- In dev mode, Vite proxies `/api` requests to avoid CORS

## Tech Stack

- **React 19** + **Vite 6**
- **Syne** (display) + **Outfit** (body) fonts
- Pure inline styles — no CSS framework dependency
- Zero backend — static deploy anywhere

## Studios

| Studio | Description | Models |
|--------|-------------|--------|
| Generate | Text-to-image | 42 models |
| Motion | Text-to-video | 68 models |
| Sync | Lip sync & portrait animation | 8 models |
| Cinema | Cinematic camera builder | Prompt compiler |

## License

MIT
