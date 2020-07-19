import { Person } from "store/reducers/movies/types";

type ChangeFunc = (event: any, people: Person[] | null) => void;

export interface MovieFiltersProps {
  onCastChange: ChangeFunc;
  onDirectorChange: ChangeFunc;
  onProducerChange: ChangeFunc;
  onWriterChange: ChangeFunc;
  className?: string;
}
