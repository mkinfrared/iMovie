import groupBy from "lodash/groupBy";

import { Seat } from "store/reducers/cinemas/types";

const getSeatRowsLength = (seats: Seat[]) => {
  const seatsObj = groupBy(seats, "row");
  const record: Record<string, number> = {};

  Object.keys(seatsObj).forEach((key) => {
    record[key] = seatsObj[key].length;
  });

  return record;
};

export default getSeatRowsLength;
