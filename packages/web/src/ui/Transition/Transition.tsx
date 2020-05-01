import Slide from "@material-ui/core/Slide";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default React.memo(Transition);
