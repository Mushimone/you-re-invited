"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/"), 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-3 text-center px-6">
      <p className="text-5xl">&#x1F54A;</p>
      <h1 className="text-2xl font-semibold text-stone-700">
        You&apos;ve been signed out
      </h1>
      <p className="text-stone-500 text-sm">
        Redirecting you to the home page&hellip;
      </p>
    </div>
  );
};

export default LogoutPage;
