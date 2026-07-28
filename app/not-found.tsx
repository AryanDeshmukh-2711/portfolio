import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";

export default function NotFound() {
  return (
    <div className="pb-4">
      <PageHeading lead="Page not" trail="Found" />
      <p className="mt-9 max-w-[400px] text-[15px] leading-[1.75] text-muted">
        That page doesn&apos;t exist — it may have moved or never shipped.
      </p>
      <Link
        href="/"
        className="glow-accent mt-8 inline-flex rounded-full bg-accent px-6 py-3"
      >
        <span className="label-xs text-white">Back home</span>
      </Link>
    </div>
  );
}
