# Switzer font files (optional – for design parity)

Body font is currently **DM Sans** via next/font (no 404s, good for Lighthouse). To use **Switzer** instead:

Download Switzer from [fontshare.com/fonts/switzer](https://www.fontshare.com/fonts/switzer) (free, open source). Export or download **woff2** for each weight and place them here with these **exact** names:

- Switzer-Light.woff2 (weight 300)
- Switzer-Regular.woff2 (400)
- Switzer-Medium.woff2 (500)
- Switzer-Semibold.woff2 (600)
- Switzer-Bold.woff2 (700)
- Switzer-Extrabold.woff2 (800)

Then in `src/app/globals.css` uncomment the Switzer `@font-face` blocks and set `--font-body` in `@theme` to `'Switzer', sans-serif`. In `src/app/layout.tsx` you can remove the DM_Sans font and its variable if you use Switzer only.
