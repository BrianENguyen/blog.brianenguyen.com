export function getYear(dateString) {
  let year = '';
  const regex = /\d{4}/;
  const match = dateString.match(regex);
  if (match) {
    year = match[0];
    return year;
  }
  return '';
}
