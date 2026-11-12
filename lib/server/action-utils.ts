import "server-only";
import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
export function positiveId(value: unknown): number {
  const n =
    typeof value === "string" && /^\d+$/.test(value) ? Number(value) : value;
  if (
    typeof n !== "number" ||
    !Number.isSafeInteger(n) ||
    n < 1 ||
    n > 2147483647
  )
    throw new Error("Invalid identifier.");
  return n;
}
export function text(form: FormData, key: string, max = 100000): string {
  const value = form.get(key);
  if (typeof value !== "string" || !value.trim() || value.length > max)
    throw new Error("Invalid " + key + ".");
  return value.trim();
}
export function refresh(path?: string) {
  revalidatePath("/", "layout");
  if (
    path &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    path.length < 1024
  )
    revalidatePath(path);
}
export async function mutation<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    unstable_rethrow(error);
    // Log classification only: query parameters and connection URLs can contain secrets.
    console.error("Mutation failed", {
      name: error instanceof Error ? error.name : "Unknown",
      code:
        typeof error === "object" && error && "code" in error
          ? error.code
          : undefined,
    });
    throw new Error(
      "Unable to save changes. Check your permissions and input, then try again.",
    );
  }
}
