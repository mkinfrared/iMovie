import loadable from "@loadable/component";
import React from "react";

import { LoadableModal } from "react-app-env";
import ModalLoading from "ui/ModalLoading";
import PageLoading from "ui/PageLoading";

// Wait a minimum of 250ms before loading home.
const loadableModal: LoadableModal = (loadFn) =>
  loadable(loadFn, {
    fallback: <ModalLoading />
  });

// Wait a minimum of 250ms before loading home.
const loadablePage: LoadableModal = (loadFn) =>
  loadable(loadFn, {
    fallback: <PageLoading />
  });

export { loadableModal, loadablePage };
