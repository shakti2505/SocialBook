
console.log('Service worker', navigator);

this.addEventListener('push', (event)=>{
    const data = event.data.json(); // Parse the push notification data
        event.waitUntil(
            this.registration.showNotification(
                data.title,
                {
                    body:data.body
                }
            )
        )
});
