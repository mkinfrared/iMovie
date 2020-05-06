import { selectCinemas } from "store/reducers/cinemas/selectors";
import { cinemaStateMock } from "store/reducers/cinemas/test/mocks";

describe("selectors", () => {
  it("should return cinemas array from store", () => {
    const result = selectCinemas({ cinemas: cinemaStateMock } as any);

    expect(result).toBe(cinemaStateMock.data);
  });
});
