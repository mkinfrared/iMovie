import React from "react";

import HeaderFC from "components/Header";
import useAuthenticationCheck from "hooks/useAuthenticationCheck";

const Header = () => {
  const isAuth = useAuthenticationCheck();

  return <HeaderFC isAuth={isAuth} />;
};

export default React.memo(Header);
