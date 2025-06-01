import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | CertifyO',
  description: 'Read our latest blog posts on technology, travel, food, and more interesting topics from the CertifyO community.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
