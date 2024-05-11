export function convertMonthToDigit(month) {
  const date = Date.parse(month + '1, 1999');
  return new Date(date).getMonth() + 1;
}
