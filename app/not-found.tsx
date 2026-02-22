import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4 text-center px-6">
      <p className="text-8xl font-serif font-bold text-stone-200">404</p>
      <h1 className="text-2xl font-semibold text-stone-700">Page not found</h1>
      <p className="text-stone-500 max-w-sm">
        This memorial page doesn&apos;t exist or hasn&apos;t been published yet.
      </p>
      <Link
        href="/"
        className="mt-2 px-5 py-2 rounded-lg bg-stone-800 text-stone-100 text-sm hover:bg-stone-700 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
