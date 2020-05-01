/// <reference types="react-scripts" />

import { DefaultComponent, LoadableComponent } from "@loadable/component";

export type LoadableModal = <T>(
  loadFn: (props: T) => Promise<DefaultComponent<T>>
) => LoadableComponent<T>;
