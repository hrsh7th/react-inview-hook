import { Group, IntersectionObserverInit } from "./group";

export class Cache {
  private groups: Group[] = [];

  /**
   * get group by IntersectionObserverInit.
   */
  public get(observerInit: IntersectionObserverInit): Group {
    const normalizedObserverInit = this.observerInit(observerInit);
    const group = this.findGroupByInit(normalizedObserverInit);
    if (group) {
      return group;
    }

    this.groups.push(new Group(normalizedObserverInit));

    return this.findGroupByInit(normalizedObserverInit)!;
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
        if (!this.isSame(group.observerInit.threshold, observerInit.threshold))
          return false;
        return true;
      }) || null
    );
  }

  /**
   * get normalized `IntersectionObserverInit`.
   */
  private observerInit(observerInit: IntersectionObserverInit) {
    return {
      root: observerInit.root || null,
      rootMargin: observerInit.rootMargin || "0px",
      threshold: observerInit.threshold || 0
    };
  }

  private isSame(value1: unknown | unknown[], value2: unknown | unknown[]) {
    const v1 = ([] as unknown[]).concat(value1);
    const v2 = ([] as unknown[]).concat(value2);
    return v1.every(v => {
      return v2.includes(v);
    });
  }
}
