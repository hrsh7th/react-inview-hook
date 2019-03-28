# react-inview-hook

react-hooks with intersection-observer.

# Why?

This module will cache IntersectionObservers (group by IntersectionObserverInit).

That's reason is performance on IE11 with polyfill.

# Note

This module uses `Map` and `IntersectionObserver`
If you use this in es5 environment, should install polyfills below.

- `Map`
  - `@babel/polyfill` or `es6-map` etc.
- `IntersectionObserver`
  - `intersection-observer`

# Usage

```tsx
import React, { useState, useRef } from "react";
import { useInView } from "react-inview-hook";

export const SomeComponent = () => {
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

# API

## useInView(props: UseInViewProps)

```ts
type UseInViewProps = {
  ref: React.RefObject<Element>;

  onEnter?: (entry: IntersectionObserverEntry) => void;

  onLeave?: (entry: IntersectionObserverEntry) => void;

  unobserveOnEnter?: boolean; // default: false

  root?: React.RefObject<Element>; // default: null

  rootMargin?: string; // default: '0px'

  threshold?: number | number[]; // default: 0
};
```
