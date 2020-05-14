import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useRef, useState } from "react";

import Screen from "icons/Screen/Screen";

import css from "./SeatsPreview.module.scss";
import { SeatsPreviewProps } from "./SeatsPreview.type";

const SeatsPreview = ({ rows }: SeatsPreviewProps) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.scrollWidth);
    }
  }, [rows]);

  const seatMap = Object.entries(rows).map((entry) => {
    const [name, quantity] = entry;
    const seatButtons: React.ReactElement[] = [];

    for (let i = 0; i < quantity; i++) {
      const seatButton = (
        <IconButton key={i + 1} size="small">
          {i + 1}
        </IconButton>
      );

      seatButtons.push(seatButton);
    }

    return (
      <div key={name} className={css.row}>
        <Typography variant="body1">{name}:</Typography>
        <div>{seatButtons}</div>
      </div>
    );
  });

  return (
    <div className={css.Seats} ref={ref}>
      <Screen className={css.screen} style={{ width }} />
      {seatMap}
    </div>
  );
};

export default React.memo(SeatsPreview);
