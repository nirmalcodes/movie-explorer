# 🎬 Movie Explorer

A responsive Movie Explorer built with **Next.js 16** and **TypeScript**, browsing the [Studio Ghibli API](https://ghibliapi.vercel.app/). Search, sort, and explore the full Ghibli film catalog — ratings, release years, directors, and more.

**Live demo:** [ghiblimovieexplorer.vercel.app](https://ghiblimovieexplorer.vercel.app/)
**Repo:** [github.com/nirmalcodes/movie-explorer](https://github.com/nirmalcodes/movie-explorer)

---

## Features

- 📱 Responsive grid layout — mobile, tablet, and desktop
- 🔍 Debounced search by movie title
- ↕️ Sort by release year or Rotten Tomatoes score (asc/desc)
- 🎞️ Movie details page — banner, poster, description, director, producer, release year, running time, rating
- 💀 Skeleton loading states for both the grid and the details page
- 🌗 Dark mode
- ⚠️ Proper empty, loading, and error states throughout
- ♿ Accessible: keyboard-navigable controls, semantic HTML, screen-reader-friendly result announcements

## Tech Stack

| Category    | Choice                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org/) (App Router)                                    |
| Language    | TypeScript                                                                        |
| Styling     | [Tailwind CSS](https://tailwindcss.com/)                                          |
| Components  | [shadcn/ui](https://ui.shadcn.com/) on [Base UI](https://base-ui.com/) primitives |
| Utilities   | [lodash-es](https://lodash.com/) (debounce, orderBy)                              |
| Icons       | [lucide-react](https://lucide.dev/)                                               |
| Theme       | [next-themes](https://github.com/pacocoursey/next-themes)                         |
| Data source | [Studio Ghibli API](https://ghibliapi.vercel.app/)                                |
| Deployment  | [Vercel](https://vercel.com/)                                                     |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Setup

```bash
# Clone the repo
git clone https://github.com/nirmalcodes/movie-explorer.git
cd movie-explorer

# Install dependencies
pnpm install

# Run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Environment Variables

| Variable               | Required | Description                                                                                                                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Base URL used to resolve absolute Open Graph/Twitter image URLs. Falls back to the deployed production URL if unset. Only needed if you deploy to a different domain. |

Create a `.env.local` if you want to override it locally:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project Structure

```
movie-explorer/
├── app/
│   ├── layout.tsx              # Root layout, metadata defaults, theme provider
│   ├── page.tsx                 # Home page — fetches films, renders the explorer
│   ├── loading.tsx / error.tsx  # Route-level loading & error states
│   └── movies/[id]/
│       ├── page.tsx             # Movie details page
│       ├── loading.tsx
│       ├── error.tsx
│       └── not-found.tsx
│
├── components/
│   ├── ui/                      # shadcn/ui primitives (button, card, select, etc.)
│   └── movies/
│       ├── MovieExplorer.tsx    # Owns search/sort state
│       ├── SearchBar.tsx
│       ├── SortControl.tsx
│       ├── MovieGrid.tsx / MovieCard.tsx
│       ├── MovieGridSkeleton.tsx / MovieCardSkeleton.tsx
│       ├── EmptyState.tsx
│       └── details/
│           ├── MovieBanner.tsx
│           ├── MoviePoster.tsx
│           ├── MovieMeta.tsx
│           └── MovieDetailsSkeleton.tsx
│
├── lib/
│   ├── api.ts                   # getFilms(), getFilmById() — Ghibli API layer
│   ├── types.ts                 # Film / NormalizedFilm types
│   ├── constants.ts             # API endpoints, sort options
│   └── utils.ts                 # formatRuntime, sortFilms, filterFilmsByTitle, cn
│
└── public/
    └── placeholder-poster.png   # Fallback poster image
```

## API

Data comes from the public [Studio Ghibli API](https://ghibliapi.vercel.app/):

- `GET /films` — full film catalog (used for the grid)
- `GET /films/{id}` — a single film by id (used for the details page)

Numeric fields returned as strings by the API (`release_date`, `running_time`, `rt_score`) are normalized to numbers in `lib/api.ts` before reaching any component.

## Design Notes

- **Base UI's `Select`** requires an `items` prop to resolve a selected value back to its label in the trigger (unlike Radix, which infers it from rendered children) — see `SortControl.tsx`.

## Deployment

Deployed on [Vercel](https://vercel.com/), connected directly to this GitHub repo — every push to `main` triggers a new production deployment.

## Author

**Nirmal Fernando**

- Portfolio: [srnfernando.vercel.app](https://srnfernando.vercel.app)
- GitHub: [@nirmalcodes](https://github.com/nirmalcodes)
- LinkedIn: [Nirmal Fernando](https://linkedin.com/in/srnfernando)

## License

MIT
