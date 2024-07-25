import { useEffect, useRef, useState } from "react";

export const usePosition = (dependepcies: any) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [position, setPosition] = useState<null | number>(null);

  useEffect(() => {
    if (!ref || !ref.current) return

    const handleClick = (ev: MouseEvent) => {
      if (ev.ctrlKey && ev.target) {
        setPosition((ev.target as HTMLTextAreaElement).selectionStart)
      }
    }

    ref.current.addEventListener("click", handleClick)
    return () => {
      if (!ref || !ref.current) return
      ref.current.removeEventListener("click", handleClick)
    }
  }, [dependepcies])

  return {
    ref,
    position,
    setPosition
  }
};
