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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnfonts.com/css/satoshi"
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
                  satoshi: ["Satoshi", "sans-serif"],
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
          /* Light Mode Theme */
          .light {
            color-scheme: light;
          }

          .light {
            --color-on-secondary-fixed: #001258;
            --color-on-primary-fixed: #001258;
            --color-on-secondary-container: #303f87;
            --color-surface: #ffffff;
            --color-surface-variant: #e2e1ef;
            --color-tertiary-fixed: #ffdbd0;
            --color-on-primary: #ffffff;
            --color-surface-tint: #1b49ef;
            --color-inverse-surface: #2e303a;
            --color-background: #ffffff;
            --color-primary-container: #2751f6;
            --color-outline-variant: #c4c5d9;
            --color-error-container: #ffdad6;
            --color-on-background: #1a1b24;
            --color-on-secondary: #ffffff;
            --color-on-error: #ffffff;
            --color-secondary-container: #a0afff;
            --color-on-error-container: #93000a;
            --color-on-primary-fixed-variant: #0032c3;
            --color-secondary: #4a59a3;
            --color-inverse-primary: #b9c3ff;
            --color-surface-dim: #f3f4f6;
            --color-on-secondary-fixed-variant: #324189;
            --color-on-surface-variant: #444656;
            --color-surface-container-low: #f8f9fa;
            --color-on-tertiary-container: #ffdbd1;
            --color-secondary-fixed-dim: #b9c3ff;
            --color-on-primary-container: #dee1ff;
            --color-outline: #747688;
            --color-inverse-on-surface: #f0effd;
            --color-primary-fixed: #dee1ff;
            --color-surface-container-highest: #e2e1ef;
            --color-surface-container-lowest: #ffffff;
            --color-on-tertiary: #ffffff;
            --color-secondary-fixed: #dee1ff;
            --color-tertiary-fixed-dim: #ffb59e;
            --color-error: #ba1a1a;
            --color-tertiary: #8f2900;
            --color-surface-bright: #ffffff;
            --color-on-surface: #1a1b24;
            --color-surface-container: #f8f9fa;
            --color-on-tertiary-fixed-variant: #842500;
            --color-primary: #2751f6;
            --color-primary-fixed-dim: #b9c3ff;
            --color-on-tertiary-fixed: #3a0b00;
            --color-tertiary-container: #b83700;
            --color-surface-container-high: #e8e7f4;
          }

          .light .bg-surface {
            background-color: #ffffff;
          }

          .light .bg-slate-50 {
            background-color: #f8f9fa;
          }

          .light .bg-slate-100 {
            background-color: #f3f4f6;
          }

          .light .text-on-surface {
            color: #1a1b24;
          }

          .light .text-on-surface-variant {
            color: #444656;
          }

          .light .text-primary-container {
            color: #2751f6;
          }

          .light .border-outline-variant {
            border-color: #c4c5d9;
          }

          .light .border-outline-variant\/20 {
            border-color: rgba(196, 197, 217, 0.2);
          }

          .light .border-outline-variant\/30 {
            border-color: rgba(196, 197, 217, 0.3);
          }

          .light .border-outline-variant\/10 {
            border-color: rgba(196, 197, 217, 0.1);
          }

          .light .glass-panel {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
          }

          .light .glass-nav {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
          }

          .light .bg-gradient-to-br.from-primary.to-primary-container {
            background: linear-gradient(135deg, #2751f6 0%, #2751f6 100%);
          }

          .light .gradient-primary {
            background: linear-gradient(135deg, #2751f6 0%, #2751f6 100%);
          }

          .light .hover\:border-primary-container\/30:hover {
            border-color: rgba(39, 81, 246, 0.3);
          }

          .light .group-hover\:text-primary-container:hover {
            color: #2751f6;
          }

          .light .hover\:opacity-95:hover {
            opacity: 0.95;
          }

          .light .shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          .satoshi {
            font-family: "Satoshi", sans-serif;
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

          .card-glow-hover:hover {
            box-shadow: 0 0 30px rgba(0, 229, 255, 0.05);
          }

          .light .card-glow-hover:hover {
            box-shadow: 0 0 30px rgba(39, 81, 246, 0.05);
          }

          .glow-shadow {
            box-shadow: 0 40px 40px -15px rgba(0, 79, 88, 0.15);
          }

          .light .glow-shadow {
            box-shadow: 0 40px 40px -15px rgba(39, 81, 246, 0.15);
          }

          .light .hover\:bg-slate-50:hover {
            background-color: #f8f9fa;
          }

          .light .border-error\/40 {
            border-color: rgba(186, 26, 26, 0.4);
          }

          .light .border-tertiary\/40 {
            border-color: rgba(143, 41, 0, 0.4);
          }

          .light .shadow-sm {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          .light .shadow-xl {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col font-body bg-surface text-on-surface" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
