import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Journal | Do Tell The Bride',
  description: 'Practical planning wisdom, editorial styling ideas and marketing insights for growing your wedding business.'
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="blog-archive">
      <div className="section-heading">
        <p className="eyebrow">The Journal</p>
        <h1>Calm thinking for modern weddings</h1>
        <p>
          Honest thinking on modern wedding planning - from decision overload and budget anxiety to design clarity, timelines, and the emotional stuff nobody warns you about. Practical ideas, grounded advice, and calm perspective for couples who want a wedding that actually feels like theirs.
        </p>
      </div>
      <div className="blog-archive__grid">
        {posts.map((post) => (
          <article key={post.slug}>
            {post.coverImage ? (
              <div className="media-frame large">
                <Image src={post.coverImage} alt={post.title} width={720} height={420} />
              </div>
            ) : null}
            <p className="eyebrow">{new Date(post.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <h3>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p>{post.excerpt}</p>
            <div className="tag-row">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`} className="text-button">
              Keep reading
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
