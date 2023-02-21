## About
I've recently used this tools to make my web apps, and the installation/configuration process is really tedious (mostly vite-plugin-wa), so I decided to make a template! This template is based off the "react-ts" Vite template

## Features
- Vite (fast/pleasing developing experience)
- React (team react)
- TypeScript (goodbye type errors! welcome headaches!)
- PWA (basic configuration for stale-while-revalidate strategy)
- Redux (manage safely state in your app)
- MantineUI (nice and customizable component library with emotion. Includes the most important/useful modules)
- Emotion (i like my css in my typescript)
- React Icons (every app needs icons. This module has a ton, visit [this link](https://react-icons.github.io/react-icons/) to easily search the ones you need)

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/ademondev/react-ts-redux-mantineui-template/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit ademondev/react-ts-redux-mantineui-template my-react-ts-redux-app
cd my-react-ts-redux-app
npm install
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `index.html`
- [ ] Add icons in the favicon in `/src/public` folder with the correct name (the same ones in `vite.config.ts`)
- [ ] Remove the `.github` folder which contains the funding info
- [ ] Clean up the READMEs

And, enjoy :)

## Usage

### Development

Just run:

```bash
npm run dev
```

### Build

To build the app, run:

```bash
npm run build
```

And you will see the generated file in `dist` that ready to be served.