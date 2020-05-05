import React from "react";

import HeaderFC from "components/Header";
import useAuthenticationCheck from "hooks/useAuthenticationCheck";
import useIsAdmin from "hooks/useIsAdmin";

const Header = () => {
  const isAuth = useAuthenticationCheck();
  const isAdmin = useIsAdmin();

  return <HeaderFC isAuth={isAuth} isAdmin={isAdmin} />;
};

export default React.memo(Header);
