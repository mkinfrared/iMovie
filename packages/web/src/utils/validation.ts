import * as yup from "yup";

const requiredField = "This field is required";

const addCinemaFormValidation = yup.object().shape({
  cinemaName: yup.string().required(),
  country: yup
    .object()
    .shape({
      alpha2code: yup.string(),
      name: yup.string().required()
    })
    .required(requiredField),
  zipcode: yup.string().required()
});

export { addCinemaFormValidation };
