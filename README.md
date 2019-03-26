# react-inview-hook

react-hooks with intersection-observer.

# Why?

This module will cache IntersectionObservers (group by IntersectionObserverInit).
That's reason is performance on IE11 with polyfill.

# Usage

```tsx
import React, { useState, useRef } from "react";
import { useInView } from "react-inview-hook";

export const SomeComponent = ({ recheck }: Props) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useInView({
    ref,
    onEnter: () => setIsInView(true),
    onLeave: () => setIsInView(false)
  });

  return <div ref={ref}>isInView? {isInView ? "true" : "false"}</div>;
};
```

# Tips

You can re-invoke `onEnter` via `useInView({ ... } , [revision])`.
