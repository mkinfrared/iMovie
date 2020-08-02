import {
  selectCinemaAuditoriums,
  selectCinemas,
  selectCinema
} from "../selectors";
import { auditoriumsMock, cinemaStateMock } from "./mocks";

describe("selectors", () => {
  it("should return cinemas array from store", () => {
    const result = selectCinemas({ cinemas: cinemaStateMock } as any);

    expect(result).toBe(cinemaStateMock.data);
  });

  it("should return a cinema from store by id", () => {
    const { data } = cinemaStateMock;
    const { id } = data[0];
    const result = selectCinema(id).resultFunc(cinemaStateMock.data);

    expect(result?.id).toBe(id);
  });

  it("should return cinema auditorium array from store", () => {
    const mock = { ...cinemaStateMock };
    mock.data[0].auditoriums = auditoriumsMock;
    const result = selectCinemaAuditoriums(42).resultFunc(mock.data[0]);

    expect(result).toHaveLength(1);
    expect(result![0].id).toBe(auditoriumsMock[0].id);
  });
});
