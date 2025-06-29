import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Atishay Jain',
  description: 'My playground for thoughts and about me!',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="h-full flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Layout>{children}</Layout>
          </main>
        </div>
      </body>
    </html>
  );
}
