import type { Metadata, ResolvingMetadata } from 'next';

// Define the BlogPost interface and samplePostsDataForSlugPage array here
// This data is needed for generateMetadata
interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string; // Although not directly used by generateMetadata, it's part of the canonical BlogPost model
  slug: string;
  date: string;
  category: string;
  author?: string;
  // imageUrl?: string; // If you plan to use images in OpenGraph metadata
}

const samplePostsDataForSlugPage: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    slug: 'getting-started-nextjs-14', // Matches slug in page.tsx postDisplayData
    description: 'A beginner-friendly guide to setting up your first Next.js 14 application.',
    content: `Next.js 14 introduces several exciting features... <br /><br /> Here's how to set up a new project: <br />\`npx create-next-app@latest\``,
    date: '2024-03-10',
    category: 'Technology',
    author: 'Admin User',
  },
  {
    id: '2',
    title: 'Top 5 Travel Destinations for 2024',
    slug: 'top-travel-destinations-2024', // Example, ensure slugs can match if needed
    description: 'Explore breathtaking views and cultures with our top picks for your next vacation.',
    content: 'From the serene beaches of Bali to the historic streets of Rome... <br /><br />1. Bali, Indonesia <br />2. Rome, Italy <br />3. Kyoto, Japan <br />4. Paris, France <br />5. Banff National Park, Canada',
    date: '2024-03-12',
    category: 'Travel',
    author: 'Travel Blogger',
  },
  {
    id: '3',
    title: 'The Ultimate Guide to Delicious Homemade Pizza',
    slug: 'homemade-pizza-guide', // Example
    description: 'Learn how to make pizzeria-quality pizza in the comfort of your own kitchen.',
    content: 'Crafting the perfect pizza at home is an art... <br /><br />Key ingredients: <br />- Dough <br />- Tomato Sauce <br />- Cheese <br />- Your favorite toppings',
    date: '2024-03-15',
    category: 'Food',
    author: 'Chef G',
  },
  {
    id: '4',
    title: 'Understanding Cloud Computing',
    slug: 'understanding-cloud-computing', // Example
    description: 'A comprehensive overview of cloud computing models, services, and benefits.',
    content: 'Cloud computing has revolutionized the way businesses operate... <br /><br />Models: IaaS, PaaS, SaaS. <br />Services: AWS, Azure, GCP.',
    date: '2024-03-18',
    category: 'Technology',
    author: 'Tech Expert',
  },
  // Match slugs from the page component's postDisplayData for consistency if they should map 1:1
  // For example, if page.tsx has a post with slug 'first-post', ensure it's here for metadata
  {
    id: '5', // New ID
    title: 'My First Blog Post', // Title from page.tsx
    slug: 'first-post', // Slug from page.tsx
    description: 'This is the description for my first blog post about web development.', // Desc from page.tsx
    content: 'Content for first post...', // Content can be brief here if only for page component
    date: 'October 26, 2023', // Date from page.tsx
    category: 'Technology', // Category from page.tsx
    author: 'CertifyO Team',
  },
  {
    id: '6',
    title: 'Another Interesting Article',
    slug: 'interesting-article',
    description: 'A brief overview of an interesting topic in the world of travel.',
    content: 'Content for another article...',
    date: 'October 27, 2023',
    category: 'Travel',
    author: 'CertifyO Contributor',
  },
  {
    id: '7',
    title: 'Next.js is Awesome',
    slug: 'nextjs-awesome',
    description: 'Why I love working with Next.js and React for modern web apps.',
    content: 'Content for Next.js article...',
    date: 'October 28, 2023',
    category: 'Technology',
    author: 'CertifyO Developer',
  },
   {
    id: '8',
    title: 'Delicious Recipes', // Matched title
    slug: 'delicious-recipes', // Matched slug
    description: 'Sharing some of my favorite recipes for everyone to enjoy.', // Matched description
    content: 'Detailed content for delicious recipes...',
    date: 'October 29, 2023', // Matched date
    category: 'Food', // Matched category
    author: 'CertifyO Chef',
  },
  {
    id: '9',
    title: 'Exploring National Parks', // Matched title
    slug: 'national-parks', // Matched slug
    description: 'A guide to the most beautiful national parks and hiking trails.', // Matched description
    content: 'Detailed content for exploring national parks...',
    date: 'October 30, 2023', // Matched date
    category: 'Travel', // Matched category
    author: 'CertifyO Adventurer',
  }
];

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata // Changed parent to _parent
): Promise<Metadata> {
  const slug = params.slug;
  const post = samplePostsDataForSlugPage.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found | CertifyO Blog',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | CertifyO Blog`,
    description: post.description,
    // openGraph: { // Example for Open Graph data
    //   title: post.title,
    //   description: post.description,
    //   // images: [{ url: post.imageUrl || '/default-og-image.png' }],
    // },
  };
}

export default function BlogPostLayout({
  children,
  _params, // Prefixed with underscore
}: {
  children: React.ReactNode;
  _params: any; // Changed type to any and prefixed
}) {
  // _params can be used here if needed, e.g. for context providers
  // console.log('Blog Post Layout Params:', _params);
  return <>{children}</>;
}
