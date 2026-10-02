This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## FE-AA2 — Interactive 3D Experience

### Interactive 3D Study Desk

KTU Mate includes a lightweight interactive 3D study desk built with React Three Fiber and Three.js.

The scene contains:

- Laptop
- Study book
- Coffee cup
- Desk

### Interaction

The experience supports:

- Orbit controls for rotating the scene
- Scroll/touch zoom
- Clicking the study book changes its material color

### Responsible Loading

The 3D scene is lazy-loaded so the Three.js experience is not loaded as part of the initial page render.

A static fallback is used when:

- The user prefers reduced motion
- The device reports 2 or fewer logical CPU cores

The scene uses simple primitive geometries instead of a large external 3D model, keeping the experience lightweight.

### Mobile Support

The experience supports mouse and touch interaction through React Three Fiber's OrbitControls.

The canvas height also adapts for smaller screens.

### FE-10 Performance Check

Lighthouse desktop audit:

- Performance: 100/100
- First Contentful Paint: 0.5 s
- Largest Contentful Paint: 0.6 s
- Total Blocking Time: 0 ms
- Cumulative Layout Shift: 0
- Speed Index: 0.5 s

The scene intentionally uses lightweight primitive geometry and does not load a large GLB/GLTF model. The 3D canvas is also lazy-loaded and has a static fallback for reduced-motion and low-power contexts.

### What I Would Add With More Time

- More detailed 3D study objects
- Interactive laptop screen
- Custom 3D models
- More material/color customization
- Small animations and ambient effects