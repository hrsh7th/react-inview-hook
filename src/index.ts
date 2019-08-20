import { RefObject, useEffect } from "react";
import { Cache } from "./cache";

const cache = new Cache();

type Props = {
  ref: RefObject<Element>;
  onEnter?: () => void;
  onLeave?: () => void;
  unobserveOnEnter?: boolean;
  root?: RefObject<Element>;
  rootMargin?: string;
  threshold?: number | number[];
};

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

    const group = cache.get({
      root: root && root.current,
      rootMargin: rootMargin,
      threshold: threshold
    });
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
