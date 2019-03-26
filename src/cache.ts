import { Group, IntersectionObserverInit } from "./group";

export class Cache {
  private groups: Group[] = [];

  /**
   * get group by IntersectionObserverInit.
   */
  public get(observerInit: IntersectionObserverInit): Group {
    const item = this.findGroupByInit(observerInit);
    if (item) {
      return item;
    }

    this.groups.push(
      new Group(
        observerInit,
        this.createObserver(observerInit),
        new Map<Element, (entry: IntersectionObserverEntry) => void>()
      )
    );

    return this.findGroupByInit(observerInit)!;
  }

  /**
   * remove group.
   */
  public remove(group: Group) {
    this.groups = this.groups.filter(g => g !== group);
    group.observer.disconnect();
  }

  /**
   * find cached group.
   */
  private findGroupByInit(
    observerInit: IntersectionObserverInit
  ): Group | null {
    return (
      this.groups.find(group => {
        if (group.observerInit.root !== observerInit.root) return false;
        if (group.observerInit.rootMargin !== observerInit.rootMargin)
          return false;
        if (group.observerInit.threshold !== observerInit.threshold)
          return false;
        return true;
      }) || null
    );
  }

  /**
   * create intersection observer instance.
   */
  private createObserver(
    observerInit: IntersectionObserverInit
  ): IntersectionObserver {
    return new IntersectionObserver(
      entries => {
        const group = this.findGroupByInit(observerInit)!;
        entries.forEach(entry => {
          group.callback(entry.target)(entry);
        });
      },
      {
        root: (observerInit.root && observerInit.root.current) || null,
        rootMargin: observerInit.rootMargin || "0px",
        threshold: observerInit.threshold || 1
      }
    );
  }
}
