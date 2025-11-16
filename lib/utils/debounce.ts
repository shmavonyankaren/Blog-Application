type DebouncedFunction<T extends (...args: never[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout | undefined;

  const debouncedFn = function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  } as DebouncedFunction<T>;

  debouncedFn.cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  };

  return debouncedFn;
}

export default debounce;
