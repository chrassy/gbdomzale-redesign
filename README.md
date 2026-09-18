# Gracie Barra Domžale — redesign prototype

Homepage prototype for a new [gbdomzale.si](https://gbdomzale.si). Static HTML/CSS/JS, no build step.

- Timetable 2026/27 lives in the `S` array in `index.html` — the program cards and booking form read from it.
- The booking form is a demo and doesn't send anything yet.
- `noindex` is set so the prototype doesn't compete with the live site in search.

## Hero video
`video/hero-1280.mp4` (desktop) and `video/hero-854.mp4` (mobile) are a 13.8 s cut-to-cut loop (39.80–53.58 s) from the *Gracie Barra Institucional* film by Lucas Ferraz. H.264, no audio, fast-start. `video/hero-poster.jpg` is the first frame and shows until the video loads, and stays as the only image for visitors with reduced motion or data saver on.
