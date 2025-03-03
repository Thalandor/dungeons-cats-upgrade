import { useCallback, useEffect } from "react";

export function useKeyPress(callback: () => void, keyCodes: string[]): void {
  const handler = useCallback(
    ({ code }: KeyboardEvent) => {
      if (keyCodes.includes(code)) {
        callback();
      }
    },
    [callback, keyCodes]
  );

  useEffect(() => {
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [handler]);
}
