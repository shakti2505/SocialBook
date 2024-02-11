const options = {
    vapidDetails: {
        subject: 'mailto:myemail@example.com',
        publicKey: process.env.VAPID_PUBLIC_KEY,
        privateKey: process.env.PrivateKey,
    },
};


export default options;