import type { Metadata, Viewport } from 'next';
import './globals.css';
import './polish.css';

export const metadata: Metadata = {
  title: 'Каскада Маркет',
  description: 'Тёплый интернет-магазин локальных брендов для покупателей.',
  applicationName: 'Каскада Маркет'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
