const cors = require('cors');
const api = require('./api/v1');
const tasks = require('./task');


module.exports = (app) => {
    app.use('/task',  tasks);
    app.use('/api/v1', cors(), api);

};