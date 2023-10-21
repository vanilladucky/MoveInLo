export default function TimeFormat(time) {
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const marker = time.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${marker}`;
}
