import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-stone-100 to-background">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <span className="text-5xl">🕊️</span>
        <h1 className="text-2xl font-serif font-semibold text-stone-800">
          Check your email
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          We&apos;ve sent you a confirmation link. Open it to activate your
          account, then come back and sign in.
        </p>
        <Link
          href="/login"
          className="mt-2 px-5 py-2.5 rounded-lg bg-stone-800 text-stone-100 text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Go to sign in
        </Link>
      </div>
    </div>
  );
}
