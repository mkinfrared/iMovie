import loadable from "@loadable/component";
import React from "react";

import { LoadableModal } from "react-app-env";
import ModalLoading from "ui/ModalLoading";

// Wait a minimum of 250ms before loading home.
const loadableModal: LoadableModal = (loadFn) =>
  loadable(loadFn, {
    fallback: <ModalLoading />
  });

// Wait a minimum of 250ms before loading home.
const loadablePage: LoadableModal = (loadFn) =>
  loadable(loadFn, {
    fallback: <ModalLoading />
  });

export { loadableModal, loadablePage };
