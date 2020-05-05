import React from "react";
import { useHistory } from "react-router-dom";

import useIsAdmin from "hooks/useIsAdmin";
import RoutesFC from "routes";

const Routes = () => {
  const history = useHistory();
  const isAdmin = useIsAdmin();

  return <RoutesFC history={history} isAdmin={isAdmin} />;
};

export default React.memo(Routes);
