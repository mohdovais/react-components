import { useEffect, useState } from "./react";

const displayNone: React.CSSProperties = { display: "none" };
const win = window;
const addEventListener = win.addEventListener;
const removeEventListener = win.removeEventListener;
const EVENT_RESIZE = "resize";
const EVENT_SCROLL = "scroll";

function getPosition(
  el: HTMLElement | null,
  defaults = displayNone
): React.CSSProperties {
  if (el == null) {
    return defaults;
  }

  const viewportHeight = win.innerHeight;
  const viewportWidth = win.innerWidth;

  const { top, left, bottom, height, width } = el.getBoundingClientRect();

  if (top < 0 || top > viewportHeight || left < 0 || left > viewportWidth) {
    return defaults;
  }

  const bottomSpace = viewportHeight - bottom;
  const rightSpace = viewportWidth - left;

  const style: React.CSSProperties = {
    position: "absolute",
    width: "max-content",
    minWidth: width,
  };

  if (top < bottomSpace) {
    style.top = height;
    style.maxHeight = Math.floor(viewportHeight - bottom - 5);
  } else {
    style.bottom = height;
    style.maxHeight = top - 5;
  }

  if (left < rightSpace) {
    style.left = 0;
    style.maxWidth = Math.floor(viewportWidth - left - 5);
  } else {
    style.right = 0;
    style.maxWidth = left - 5;
  }

  return style;
}

export function usePickerPosition(
  ref: React.RefObject<HTMLElement>,
  expanded = false
): React.CSSProperties {
  const [position, setPosition] = useState(displayNone);

  useEffect(() => {
    let busy = false;
    function doCalculate() {
      if (expanded && !busy) {
        busy = true;
        win.requestAnimationFrame(() => {
          setPosition(getPosition(ref.current));
          busy = false;
        });
      }
    }
    addEventListener(EVENT_RESIZE, doCalculate);
    addEventListener(EVENT_SCROLL, doCalculate);

    if (expanded) {
      doCalculate();
    } else {
      setPosition(displayNone);
    }

    return () => {
      removeEventListener(EVENT_RESIZE, doCalculate);
      removeEventListener(EVENT_SCROLL, doCalculate);
    };
  }, [ref, expanded]);

  return position;
}
