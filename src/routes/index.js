const cors = require('cors');
const api = require('./api/v1');


module.exports = (app) => {
    app.use('/api/v1', cors(), api);

};