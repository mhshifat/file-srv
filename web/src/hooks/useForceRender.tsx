import { useState, useCallback } from "react";

export default function useForceRender() {
  const [, setCount] = useState(0);

  return useCallback(
    () => setCount((prev) => prev + 1),
    []
  );
}