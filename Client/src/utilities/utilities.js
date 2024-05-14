const getDays = (dateTime) => {
  const currentDate = Date.now();
  const dt = new Date(dateTime).getTime();
  const millisec = dt - currentDate;

  const hours = Math.abs(millisec) / (1000 * 60 * 60);
  const minutes = Math.abs(millisec) / (1000 * 60);
  if (hours >= 24) {
    return `${Math.floor(hours / 24)} Days ago`; // return days
  } else if (hours >= 1) {
    return `${Math.floor(hours)} hours ago`; // return hours
  } else {
    return `${Math.floor(minutes)} minutes ago`; // return minutes
  }
};

const get_request = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    let message = "An error occured";
    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }
  return data;  
};

export { getDays , get_request};
