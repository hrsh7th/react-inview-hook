import { RefObject, useLayoutEffect } from "react";
import { Cache } from "./cache";
import { IntersectionObserverInit } from "./group";

const cache = new Cache();

type Props = {
  ref: RefObject<Element>;
  onEnter?: () => void;
  onLeave?: () => void;
  unobserveOnEnter?: boolean;
} & IntersectionObserverInit;

export const useInView = (
  {
    ref,
    onEnter = () => {},
    onLeave = () => {},
    unobserveOnEnter = false,
    root,
    rootMargin,
    threshold
  }: Props,
  deps: any[]
) => {
  const group = cache.get({ root, rootMargin, threshold });

  // recheck if needed
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    group.check(element);
  }, deps);

  // register/unregister
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    group.register(element, entry => {
      if (entry.isIntersecting) {
        onEnter();
        if (unobserveOnEnter) {
          group.unregister(element);
        }
      } else {
        onLeave();
      }
    });

    return () => {
      group.unregister(element);
      if (group.isEmpty()) {
        cache.remove(group);
      }
    };
  }, []);
};

export const _debug = cache;
