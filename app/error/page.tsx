export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4 text-center px-6">
      <p className="text-5xl font-serif text-stone-300">Oops</p>
      <h1 className="text-2xl font-semibold text-stone-700">
        Something went wrong
      </h1>
      <p className="text-stone-500 max-w-sm">
        An unexpected error occurred. Please try again or go back to the home
        page.
      </p>
      <a
        href="/"
        className="mt-2 px-5 py-2 rounded-lg bg-stone-800 text-stone-100 text-sm hover:bg-stone-700 transition-colors"
      >
        Back to home
      </a>
    </div>
  );
}
