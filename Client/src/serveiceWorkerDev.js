import BASE_URL_API from "./utilities/baseURL";
import axios from 'axios';

const swDev = async () => {
    try {
        let BASE_URL
        if(
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1" ||
            window.location.hostname === ""
             
        ){
            BASE_URL = 'http://localhost:3000';
        }else{
            BASE_URL="https://socialbook-x3jq.onrender.com"
        }
        let url = `${BASE_URL}/sw.js`
        const register = await navigator.serviceWorker.register(url);
        console.log('register', register)
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY,
        });
        const response = await axios.post("http://localhost:4600/services/subscribe-for-push-notification", JSON.stringify({ subscription }),
            {
                withCredentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                }
            }
        );

        if (!response.status==200) {
            throw new Error('Failed to subscribe to push notifications');
        }else{
            return response.data.sub
        }
    } catch (error) {
        console.error('Error subscribing to push notifications:', error);
    }
}

export default swDev;
