const classNames = (classes: Array<string | null | undefined>) => {
  return classes.filter((names) => !!names).join(" ");
};

export default classNames;
