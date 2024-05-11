export function convertMonthToName(month) {
  const date = new Date(2024, month - 1, 1);
  return date.toLocaleDateString('default', { month: 'long' });
}
