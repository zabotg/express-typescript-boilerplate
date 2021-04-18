export default {
    env: "dev",
    api: {
        port: 3000,
        auth: {
            expirationTime: "300s", //expires in 5 minutes
            secret: "some-secret",
        },
    },
};
