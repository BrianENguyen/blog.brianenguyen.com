export function getMonth(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'long' });
}
