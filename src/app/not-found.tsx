import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-gutter flex min-h-[80svh] flex-col items-start justify-center py-32">
      <p className="text-meta text-stone mb-6 font-mono tracking-[0.25em] uppercase">
        404 — Scene missing
      </p>
      <h1 className="text-display font-sans font-black tracking-tight uppercase">
        This frame was
        <span className="font-serif text-stone block font-light normal-case italic">
          left on the cutting-room floor.
        </span>
      </h1>
      <p className="text-lead text-stone measure-narrow mt-8">
        The page you are looking for does not exist or has moved. The work,
        however, is very much still here.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/"
          className="bg-ember text-ink hover:bg-bone inline-flex min-h-12 items-center rounded-sm px-7 py-3 font-semibold transition-colors"
        >
          Back to the homepage
        </Link>
        <Link
          href="/work"
          className="border-bone/30 text-bone hover:border-ember hover:text-ember inline-flex min-h-12 items-center rounded-sm border px-7 py-3 font-medium transition-colors"
        >
          View selected work
        </Link>
      </div>
    </div>
  );
}
