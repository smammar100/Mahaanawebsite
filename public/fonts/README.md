# Switzer font files (required for Lighthouse / no 404s)

Download Switzer from [fontshare.com/fonts/switzer](https://www.fontshare.com/fonts/switzer) (free, open source). Export or download **woff2** for each weight and place them here with these **exact** names:

- Switzer-Light.woff2 (weight 300)
- Switzer-Regular.woff2 (400)
- Switzer-Medium.woff2 (500)
- Switzer-Semibold.woff2 (600)
- Switzer-Bold.woff2 (700)
- Switzer-Extrabold.woff2 (800)

If your downloaded files use different names, rename them to match or update the `@font-face` paths in `src/app/globals.css`. Until these files exist, font requests will 404 and Lighthouse Best Practices / Performance may be affected.
