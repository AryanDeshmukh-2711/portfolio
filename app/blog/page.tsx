import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { formatDate, getSortedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Notes on machine learning, engineering and interface design.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <div className="pb-4">
      <PageHeading lead="Recent" trail="Thoughts" />

      <ul className="mt-10 border-t border-hairline">
        {posts.map((post, i) => (
          <li key={post.slug} className="border-b border-hairline">
            <Reveal index={i + 1}>
              <Wrapper href={post.href}>
                <h2 className="font-display text-[19px] font-bold tracking-tight text-white transition group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2.5 max-w-[580px] text-[14.5px] leading-[1.7] text-muted">
                  {post.excerpt}
                </p>
                <p className="font-mono mt-4 text-[12px] text-faint">
                  {formatDate(post.date)} • {post.readingTime}
                </p>
              </Wrapper>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Wrapper({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const className = "group block py-6";
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
