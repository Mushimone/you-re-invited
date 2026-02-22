import { SignUpForm } from "./components/SignUpForm";

export default function Page() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-stone-100 to-background">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
