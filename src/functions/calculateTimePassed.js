export function calculateTimePassed(inputDate) {
  const currentDate = new Date();
  const inputDateTime =
    inputDate instanceof Date ? inputDate : new Date(inputDate);

  const timeDifference = currentDate - inputDateTime;
  
  const secondsPassed = Math.floor(timeDifference / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);

  if (daysPassed > 0) {
    return `${daysPassed} д`;
  } else if (hoursPassed > 0) {
    return `${hoursPassed} ч`;
  } else if (minutesPassed > 0) {
    return `${minutesPassed} мин`;
  } else {
    return `менее мин`;
  }
}
