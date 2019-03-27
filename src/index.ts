import { RefObject, useEffect } from "react";
import { Cache } from "./cache";
import { IntersectionObserverInit } from "./group";

const cache = new Cache();

type Props = {
  ref: RefObject<Element>;
  onEnter?: () => void;
  onLeave?: () => void;
  unobserveOnEnter?: boolean;
} & IntersectionObserverInit;

export const useInView = ({
  ref,
  onEnter = () => {},
  onLeave = () => {},
  unobserveOnEnter = false,
  root,
  rootMargin,
  threshold
}: Props) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const group = cache.get({ root, rootMargin, threshold });
    group.register(element, entry => {
      if (entry.isIntersecting) {
        onEnter();
        if (unobserveOnEnter) {
          group.unregister(element);
          if (group.isEmpty()) {
            cache.remove(group);
          }
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
