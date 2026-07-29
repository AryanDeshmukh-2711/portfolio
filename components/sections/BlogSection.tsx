import { Section } from "@/components/Section";
import { formatDate, getSortedPosts } from "@/lib/content";

export function BlogSection() {
  const posts = getSortedPosts();

  return (
    <Section id="blog" lead="Recent" trail="Thoughts">
      <ul className="border-t border-hairline">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-hairline">
            <Wrapper href={post.href}>
              <h3 className="font-display text-[19px] font-bold tracking-tight text-white transition group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2.5 max-w-[580px] text-[14.5px] leading-[1.7] text-muted">
                {post.excerpt}
              </p>
              <p className="font-mono mt-4 text-[12px] text-faint">
                {formatDate(post.date)} • {post.readingTime}
              </p>
            </Wrapper>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Wrapper({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const className =
    "group block py-6 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1.5";
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
