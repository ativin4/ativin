import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my personal portfolio!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
