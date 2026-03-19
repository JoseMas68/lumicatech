import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LumicaTech | Soluciones Tecnológicas de Alto Impacto",
  description: "Diseñamos sistemas que funcionan. Ingeniería de precisión y mentalidad de producto.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script id="tailwind-config">
          {`tailwind.config = {
            darkMode: "class",
            theme: {
              extend: {
                colors: {
                  "primary-container": "#00e5ff",
                  "secondary-container": "#4a4949",
                  "on-error-container": "#ffdad6",
                  "on-secondary-fixed": "#1c1b1b",
                  "inverse-on-surface": "#313030",
                  "on-primary-fixed-variant": "#004f58",
                  "error-container": "#93000a",
                  "surface-tint": "#00daf3",
                  "on-tertiary-fixed-variant": "#474646",
                  "tertiary-container": "#d3d0cf",
                  "surface-dim": "#131313",
                  primary: "#c3f5ff",
                  "on-surface-variant": "#bac9cc",
                  secondary: "#c8c6c5",
                  "on-tertiary": "#313030",
                  "on-error": "#690005",
                  "on-secondary": "#313030",
                  "primary-fixed-dim": "#00daf3",
                  "on-tertiary-container": "#5a5959",
                  "surface-container-highest": "#353534",
                  "outline-variant": "#3b494c",
                  "on-surface": "#e5e2e1",
                  "on-primary-fixed": "#001f24",
                  "primary-fixed": "#9cf0ff",
                  surface: "#131313",
                  "surface-container-high": "#2a2a2a",
                  "tertiary-fixed": "#e5e2e1",
                  "secondary-fixed-dim": "#c8c6c5",
                  "surface-container": "#201f1f",
                  "inverse-surface": "#e5e2e1",
                  "surface-container-low": "#1c1b1b",
                  "on-tertiary-fixed": "#1c1b1b",
                  "on-background": "#e5e2e1",
                  "on-secondary-container": "#bab8b7",
                  "surface-bright": "#3a3939",
                  "surface-container-lowest": "#0e0e0e",
                  "inverse-primary": "#006875",
                  "on-primary-container": "#00626e",
                  outline: "#849396",
                  "tertiary-fixed-dim": "#c9c6c5",
                  "on-primary": "#00363d",
                  error: "#ffb4ab",
                  background: "#131313"
                },
                fontFamily: {
                  headline: ["Inter"],
                  body: ["Inter"],
                  label: ["Space Grotesk"],
                  display: "Inter"
                },
                borderRadius: {
                  DEFAULT: "0.125rem",
                  lg: "0.25rem",
                  xl: "0.5rem",
                  full: "0.75rem"
                }
              }
            }
          };`}
        </script>
        <style>{`
          /* Light mode overrides */
          .light {
            color-scheme: light;
          }

          .light {
            --color-surface: #faf9f8;
            --color-surface-container-low: #f3f1f0;
            --color-surface-container: #ede9e8;
            --color-surface-container-high: #e7e3e2;
            --color-surface-container-highest: #e1dcd9;
            --color-surface-container-lowest: #ffffff;
            --color-surface-dim: #ede9e8;
            --color-surface-bright: #fefdfb;
            --color-on-surface: #1a1a1a;
            --color-on-surface-variant: #49454f;
            --color-outline-variant: #cac7c0;
            --color-outline: #79747e;
            --color-primary: #2751f6;
          }

          .light .bg-surface {
            background-color: #faf9f8;
          }

          .light .bg-surface-container-low {
            background-color: #f3f1f0;
          }

          .light .bg-surface-container {
            background-color: #ede9e8;
          }

          .light .bg-surface-container-high {
            background-color: #e7e3e2;
          }

          .light .bg-surface-container-highest {
            background-color: #e1dcd9;
          }

          .light .bg-surface-container-lowest {
            background-color: #ffffff;
          }

          .light .text-on-surface {
            color: #1a1a1a;
          }

          .light .text-on-surface-variant {
            color: #49454f;
          }

          .light .border-outline-variant {
            border-color: #cac7c0;
          }

          .light .border-outline-variant\/20 {
            border-color: rgba(202, 199, 192, 0.2);
          }

          .light .border-outline-variant\/30 {
            border-color: rgba(202, 199, 192, 0.3);
          }

          .light .glass-nav {
            background: rgba(250, 249, 248, 0.8);
            backdrop-filter: blur(24px);
            border-bottom-color: rgba(79, 79, 79, 0.1);
          }

          .light .bg-gradient-to-br.from-primary.to-primary-container {
            background: linear-gradient(135deg, #2751f6 0%, #2751f6 100%);
          }

          .light .gradient-primary {
            background: linear-gradient(135deg, #2751f6 0%, #2751f6 100%);
          }

          .light .text-primary-container {
            color: #2751f6;
          }

          .light .border-primary-container {
            border-color: #2751f6;
          }

          .light .hover\:border-primary-container\/30:hover {
            border-color: rgba(39, 81, 246, 0.3);
          }

          .light .text-on-surface-variant.group-hover\:text-primary-container {
            color: #49454f;
          }

          .light .group-hover\:text-primary-container:hover {
            color: #2751f6;
          }

          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
          }

          .technical-grid {
            background-image: 
              linear-gradient(to right, rgba(59, 73, 76, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 73, 76, 0.1) 1px, transparent 1px);
            background-size: 40px 40px;
          }

          .light .technical-grid {
            background-image: 
              linear-gradient(to right, rgba(39, 81, 246, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(39, 81, 246, 0.05) 1px, transparent 1px);
          }

          .hero-glow {
            background: radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.08) 0%, transparent 70%);
          }

          .light .hero-glow {
            background: radial-gradient(circle at 50% 50%, rgba(39, 81, 246, 0.06) 0%, transparent 70%);
          }

          .glass-nav {
            background: rgba(19, 19, 19, 0.6);
            backdrop-filter: blur(24px);
          }

          .card-glow-hover:hover {
            box-shadow: 0 0 30px rgba(0, 229, 255, 0.05);
          }

          .light .card-glow-hover:hover {
            box-shadow: 0 0 30px rgba(39, 81, 246, 0.05);
          }

          .gradient-primary {
            background: linear-gradient(135deg, #c3f5ff 0%, #00e5ff 100%);
          }

          .glow-shadow {
            box-shadow: 0 40px 40px -15px rgba(0, 79, 88, 0.15);
          }

          .light .glow-shadow {
            box-shadow: 0 40px 40px -15px rgba(39, 81, 246, 0.15);
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
