import React from "react";
import { useDispatch } from "react-redux";

import MenuFC from "components/Menu";
import { MenuProps } from "components/Menu/Menu.type";

const Menu = (props: Omit<MenuProps, "dispatch">) => {
  const dispatch = useDispatch();

  return <MenuFC dispatch={dispatch} {...props} />;
};

export default React.memo(Menu);
