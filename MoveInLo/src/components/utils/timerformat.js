export default function TimeFormat(time) {
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const marker = hours >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${marker}`;
}
