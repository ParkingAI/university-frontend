export const capitalizeRouteParam = (param) => {
  if (!param) return;
  const firstLetter = param.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainig = param.slice(1);
  return firstLetterCap + remainig;
};
