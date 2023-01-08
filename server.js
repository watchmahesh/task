const express = require('express');

const loaders = require("./src/app");

const port = 5000;

let startServer = async() => {
    const app = express();
    await loaders.init(app);

    app.listen(port, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`server running in port ${port}`);
    });
};
startServer();

