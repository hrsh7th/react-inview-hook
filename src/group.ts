import { RefObject } from "react";

export type IntersectionObserverInit = {
  root?: RefObject<Element>;
  rootMargin?: string;
  threshold?: number | number[];
};

type Callback = (entry: IntersectionObserverEntry) => void;

export class Group {
  public constructor(
    public readonly observerInit: IntersectionObserverInit,
    public readonly observer: IntersectionObserver,
    public readonly map: Map<Element, Callback>
  ) {}

  /**
   * register element to observe.
   */
  public register(element: Element, callback: Callback) {
    if (this.map.has(element)) {
      return;
    }
    this.observer.observe(element);
    this.map.set(element, callback);
  }

  /**
   * return element's callback.
   */
  public callback(element: Element): Callback {
    if (!this.map.has(element)) {
      return () => {};
    }
    return this.map.get(element)!;
  }

  /**
   * unregister element.
   */
  public unregister(element: Element) {
    if (!this.map.has(element)) {
      return;
    }
    this.observer.unobserve(element);
    this.map.delete(element);
  }

  /**
   * check immediately.
   */
  public check(element: Element) {
    if (!this.map.has(element)) {
      return;
    }
    this.observer.unobserve(element);
    this.observer.observe(element);
  }

  /**
   * has elements.
   */
  public isEmpty() {
    return this.map.size <= 0;
  }
}
