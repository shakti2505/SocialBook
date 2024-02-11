

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


this.addEventListener('push', (event) => {
    const data = event.data.json(); // Parse the push notification data

    // Fetch the image and convert it to a data URL
    fetch(data.profilePic)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onload = () => {
                const imageBase64 = reader.result;
                event.waitUntil(
                    this.registration.showNotification(data.title, {
                        body: data.body.Name,
                        image: imageBase64, // Use the data URL of the image
                        vibrate: [200, 100, 200, 100, 200, 100, 200], // Vibration pattern
                    })
                );
            };
            reader.readAsDataURL(blob);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            // Handle errors
        });
});
