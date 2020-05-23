/// <reference types="react-scripts" />

import { DefaultComponent, LoadableComponent } from "@loadable/component";
import { Dispatch } from "redux";

export type LoadableModal = <T>(
  loadFn: (props: T) => Promise<DefaultComponent<T>>
) => LoadableComponent<T>;

export type ReduxConnectedComponent = {
  dispatch: Dispatch;
};
