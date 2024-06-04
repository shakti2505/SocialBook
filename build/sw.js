// this.addEventListener('push', (event)=>{
//     const data = event.data.json(); // Parse the push notification data

//         event.waitUntil(
//             this.registration.showNotification(
//                 data.title,
//                 {
//                     body:data.body.Name,
//                     Image:
//                     vibrate: [200, 100, 200, 100, 200, 100, 200],
//                 }
//             )
//         )
// });

// this.addEventListener('push', (event) => {
//     const data = event.data.json(); // Parse the push notification data
//     console.log('Notification Data coming from server:::_____-----_____----',data)
//     // Fetch the image and convert it to a data URL
//     fetch(data.profilePic)
//         .then(response => response.blob())
//         .then(blob => {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 const imageBase64 = reader.result;
//                 event.waitUntil(
//                     this.registration.showNotification(data.title, {
//                         body: data.body.Name,
//                         icon:'../src/images/logo/logo.png',
//                         image: imageBase64,
//                         vibrate: [200],
//                     })
//                 );
//             };
//             reader.readAsDataURL(blob);
//         })
//         .catch(error => {
//             console.error('Error fetching image:', error);
//             // Handle errors

//         });
// });
this.addEventListener("message", async (event) => {
  const data = event.data;
  console.log("Notification Data coming from socket event:", data);

  try {
    // Fetch the image and convert it to a data URL
    const response = await fetch(data);
    console.log(response);
    self.registration.showNotification("Post upload", {
      body: response.postOwner,
      icon: "../src/images/logo/logo.png",
      image: response.postOwnerDP,
      vibrate: [200],
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    // Show notification without image if fetching fails
  }
});
