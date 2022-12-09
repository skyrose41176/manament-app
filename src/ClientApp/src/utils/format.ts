export const formatNumber = (value: string | number | undefined) => {
  if (value === undefined) return '';
  const formatter = new Intl.NumberFormat('en-US', {style: 'decimal'});
  return formatter.format(Math.round(Number(value)));
};
