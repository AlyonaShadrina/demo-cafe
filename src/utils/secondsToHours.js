const secondsToHours = seconds => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substr(11, 2);
  return parseInt(timeString, 10);
};

export default secondsToHours;
