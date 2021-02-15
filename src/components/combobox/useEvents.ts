import { useEffect } from "react";

export function useEvents(ref: React.RefObject<HTMLElement>) {

    
  useEffect(() => {
    ref.current?.addEventListener("keydown", console.log);
    return () => {
      ref.current?.removeEventListener("keydown", console.log);
    };
  }, []);
}
