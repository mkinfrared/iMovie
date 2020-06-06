const getFormErrors = (data: Record<string, string[]>) => {
  const responseErrors = Object.entries(data).map((entry) => {
    const [key, value] = entry;

    return {
      type: "required",
      name: key,
      message: value[0]
    };
  });

  return responseErrors;
};

export default getFormErrors;
