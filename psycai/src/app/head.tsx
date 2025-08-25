// app/head.tsx
export default function Head() {
  return (
    <>
      <title>PsycAi</title>
      {/* Standard favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* PNG versions for high-DPI displays */}
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

      {/* Optional SVG version */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      
      {/* You can add meta tags for theme color etc. if needed */}
      <meta name="theme-color" content="#111827" />
    </>
  );
}
