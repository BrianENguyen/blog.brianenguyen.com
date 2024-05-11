export function getYear(dateString) {
  try {
    let year = '';
    const regex = /\d{4}/;
    const match = dateString.match(regex);
    if (match) {
      year = match[0];
      return year;
    }
    return '';
  } catch (e) {
    return '';
  }
}
