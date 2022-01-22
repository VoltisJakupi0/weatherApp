export const capitalize = (s: string) => {
  const split = s?.split(" ");
  if (split?.length > 0) {
    return split.map((x) => {
      const space = " ";
      return x.charAt(0).toUpperCase() + x.slice(1) + space;
    });
  } else {
    return s?.charAt(0)?.toUpperCase() + s?.slice(1);
  }
};
