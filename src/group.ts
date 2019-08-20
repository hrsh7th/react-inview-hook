export type IntersectionObserverInit = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

type Callback = (entry: IntersectionObserverEntry) => void;

export class Group {
  public readonly observer: IntersectionObserver;
  public readonly map: Map<Element, Callback> = new Map();

  /**
   * @param observerInit - Normalized `IntersectionObserverInit`
   */
  public constructor(public readonly observerInit: IntersectionObserverInit) {
    this.observer = this.createObserver(observerInit);
  }

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
   * return element's callback.
   */
  public callback(element: Element): Callback {
    if (!this.map.has(element)) {
      return () => {};
    }
    return this.map.get(element)!;
  }

  /**
   * has elements.
   */
  public isEmpty() {
    return this.map.size <= 0;
  }

  /**
   * create intersection observer instance.
   */
  private createObserver(
    observerInit: IntersectionObserverInit
  ): IntersectionObserver {
    return new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          this.callback(entry.target)(entry);
        });
      },
      {
        root: observerInit.root,
        rootMargin: observerInit.rootMargin,
        threshold: observerInit.threshold
      }
    );
  }
}
