export default function handleNumber(number) {
  // Make 0, 1, 2,..., 9 become 00, 01, 02, ..., 09
  return number >= 0 && number <= 9 ? `0${number}` : number;
}
