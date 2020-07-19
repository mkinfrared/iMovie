import Typography from "@material-ui/core/Typography";
import React from "react";

import css from "components/Option/Option.module.scss";
import { OptionProps } from "components/Option/Option.type";
import Image from "ui/Image";

const Option = ({ title, imageUrl }: OptionProps) => {
  return (
    <div className={css.Option}>
      <div className={css.imageContainer}>
        <Image src={imageUrl} loadHeight={56} loadWidth={37} />
      </div>
      <Typography variant="body2">{title}</Typography>
    </div>
  );
};

export default React.memo(Option);
