import { Group, IntersectionObserverInit } from "./group";

export class Cache {
  private groups: Group[] = [];

  /**
   * get group by IntersectionObserverInit.
   */
  public get(observerInit: IntersectionObserverInit): Group {
    const group = this.findGroupByInit(observerInit);
    if (group) {
      return group;
    }

    this.groups.push(new Group(observerInit));

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
}
