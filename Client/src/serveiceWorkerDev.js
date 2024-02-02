import BASE_URL_API from "./utilities/baseURL";
const swDev = async () => {
    try {
        let url = `${BASE_URL_API}/sw.js`
        const register = await navigator.serviceWorker.register(url);
        console.log('register', register)
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY,
        });
        const response = await fetch("http://localhost:4600/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error('Failed to subscribe to push notifications');
        }
    } catch (error) {
        console.error('Error subscribing to push notifications:', error);
    }
}

export default swDev;
