import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

interface PostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const customMeta: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  'how-to-plan-a-wedding-without-losing-your-mind': {
    title: 'How to Plan a Wedding Without Losing Your Mind | Do Tell The Bride',
    description:
      'Planning a wedding and feeling overwhelmed? Learn how to plan your wedding step by step with clarity, calm, and realistic advice for modern couples.'
  },
  'what-to-do-after-getting-engaged': {
    title: 'What to Do After Getting Engaged: A Wedding Planning Checklist by Month',
    description:
      'Just got engaged and not sure what to do next? This step-by-step wedding planning checklist shows exactly what to do after getting engaged, month by month.'
  }
};

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostSafely(params.slug);
  if (!post) {
    return { title: 'Article not found | Do Tell The Bride' };
  }
  const override = customMeta[params.slug];
  return {
    title: override?.title ?? `${post.title} | Do Tell The Bride Journal`,
    description: override?.description ?? post.excerpt
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostSafely(params.slug);

  if (!post) {
    notFound();
  }
  const safePost = post;

  return (
    <article className="post">
      <Link href="/journal" className="text-button">
        ← Back to all articles
      </Link>
      {safePost.sectionTitle || safePost.sectionSubtitle ? (
        <div className="post__section">
          {safePost.sectionTitle ? <p className="eyebrow">{safePost.sectionTitle}</p> : null}
          {safePost.sectionSubtitle ? <p className="post__section-subtitle">{safePost.sectionSubtitle}</p> : null}
        </div>
      ) : null}
      <p className="eyebrow">{new Date(safePost.date).toLocaleDateString()}</p>
      <h1>{safePost.title}</h1>
      <p className="post__meta">
        Written by {safePost.author}
        {safePost.tags.length ? (
          <span>
            {' '}
            · {safePost.tags.join(' / ')}
          </span>
        ) : null}
      </p>
      {safePost.coverImage ? (
        <div className="media-frame large">
          <Image src={safePost.coverImage} alt={safePost.title} width={1200} height={640} />
        </div>
      ) : null}
      <div className="post__content" dangerouslySetInnerHTML={{ __html: safePost.contentHtml }} />
    </article>
  );
}

const getPostSafely = (slug: string) => {
  try {
    return getPostBySlug(slug);
  } catch (error) {
    console.warn(`Post not found: ${slug}`, error);
    return undefined;
  }
};
