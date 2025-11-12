"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  const errorHandler = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <div className="flex-1 w-full flex items-center justify-center min-h-0">
      {error.message}
      <button onClick={errorHandler}>Refresh</button>
    </div>
  );
}
