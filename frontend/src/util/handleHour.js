export default function handleHour(hour) {
  if (!hour) return;

  const isNumber = hour.slice(-1) >= '0' && hour.slice(-1) <= '9';

  const isHour = (parseInt(hour, 10) >= 0 && parseInt(hour, 10)) < 24;

  return (isNumber && isHour) || hour === '';
}
