const getMiliseconds = (time) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);

  const dateObject = new Date();
  dateObject.setHours(hours);
  dateObject.setMinutes(minutes);
  dateObject.setSeconds(seconds);

  // Get the time in milliseconds
  const milliseconds = dateObject.getTime();

  return milliseconds; 

  
};

export {getMiliseconds}