import reducers from "store/reducers";

type Reducers = ReturnType<typeof reducers>;

export type AppState = Omit<Reducers, "[unknown]">;
