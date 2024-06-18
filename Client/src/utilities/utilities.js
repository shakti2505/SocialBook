import axios from "axios";

const getDays = (dateTime) => {
  const currentDate = Date.now();
  const dt = new Date(dateTime).getTime();
  const millisec = dt - currentDate;
  const hours = Math.abs(millisec) / (1000 * 60 * 60);
  const minutes = Math.abs(millisec) / (1000 * 60);

  if (hours >= 24) {
    return `${Math.floor(hours / 24)} Days ago`; // return days
  } else if (hours >= 1) {
    return `${Math.floor(hours)} hrs ago`; // return hours
  } else {
    return `${Math.floor(minutes)} min ago`; // return minutes
  }
};

const getTime = (dateString) => {
  const time = new Date(dateString);
  const year = time.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[time.getMonth()];
  const day = time.getDate().toString().padStart(2, "0");

  const res = `${monthName} ${day} ${year}`;
  return res;
};

// const get_request = async (url) => {
//   const response = await fetch(url,
//     {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Credentials": true,
//           },
//    );
//   const data = await response.json();
//   if (!response.ok) {
//     let message = "An error occured";
//     if (data?.message) {
//       message = data.message;
//     }
//     return { error: true, message };
//   }
//   return data;
// };

const get_request = async (url) => {
  const response = await axios.get(url, {
    withCredentials: "include",
  });
  if (!response.status == 200) {
    console.log(response.data);
  } else {
    return response.data;
  }
};

const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      withCredentials: "include",
    });
    return response;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

const getCurrentISTDateTime = () => {
  const currentDate = new Date();

  // Current time in milliseconds adjusted for IST
  const istTime = new Date(currentDate.getTime());

  // Extract and format date and time components
  const year = istTime.getFullYear();
  const month = String(istTime.getMonth() + 1).padStart(2, '0');
  const day = String(istTime.getDate()).padStart(2, '0');
  const hours = String(istTime.getHours()).padStart(2, '0');
  const minutes = String(istTime.getMinutes()).padStart(2, '0');
  const seconds = String(istTime.getSeconds()).padStart(2, '0');

  // Format date and time
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};



export { getDays, get_request, postRequest , getTime, getCurrentISTDateTime};
