import { unstable_rethrow } from "next/navigation";
const handleError = (error: unknown): never => {
  unstable_rethrow(error);
  console.error("Application operation failed", {
    name: error instanceof Error ? error.name : "Unknown",
    code:
      typeof error === "object" && error && "code" in error
        ? error.code
        : undefined,
  });
  throw new Error("Unable to complete the request. Please try again.");
};
export default handleError;
