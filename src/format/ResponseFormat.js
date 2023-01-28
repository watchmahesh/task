let constants = require('../constants/index');
let _ = require('lodash');

const urlreq = require('url');
module.exports = {
    // eslint-disable-next-line no-unused-vars
    responseFormat: function (response, rows = null, size = null, responseOptions = null, offset = null, url = null) {
        let o = {};
        o.data = response;
        responseOptions ? o.url = responseOptions.url ? responseOptions.url : '' : '';
        // rows ? o.total_data = rows ? parseInt(rows) : 0 : '';
        // size? o.total_pages = size > 0 ? Math.ceil(rows / size) : 0:'';
        if (offset != null && !_.isEmpty(offset.toString()) && offset >= 0) {

            let limit = size;
            let urlparamLimitOffsetNext = urlreq.parse(url, true).query;
            limit = urlparamLimitOffsetNext.limit ? urlparamLimitOffsetNext.limit : size;
            offset = urlparamLimitOffsetNext.offset ? urlparamLimitOffsetNext.offset : offset;

            let nextOffset = parseInt(offset) + parseInt(size);
            let previousOffset = parseInt(offset) - parseInt(size);

            urlparamLimitOffsetNext.limit = limit;
            urlparamLimitOffsetNext.offset = nextOffset;
            urlparamLimitOffsetNext.nosafaricache = Math.random();

            let urlparamLimitOffsetPrevious = urlreq.parse(url, true).query;
            urlparamLimitOffsetPrevious.limit = limit;
            urlparamLimitOffsetPrevious.offset = previousOffset;
            urlparamLimitOffsetPrevious.nosafaricache = Math.random();

        }


        let meta = {
            copyright: constants.COPYRIGHT,
            email: constants.COPYRIGHTEMAIL,
            api: {
                version: constants.VERSION
            }

        };
        o.meta = meta;
        return JSON.parse(JSON.stringify(o));
    },

    responsePaginationFormat: function (response, rows = null, size = null, pageNum = null, totalPages = null) {
        let o = {};
        o.data = response;
        let meta = {
            copyright: constants.COPYRIGHT,
            email: constants.COPYRIGHTEMAIL,
            api: {
                version: constants.VERSION
            },
            pagination: {
                "current_page": pageNum ? pageNum : 1,
                "total": totalPages ? parseInt(totalPages) : 0,
                "total_pages": size > 0 ? Math.ceil(rows / size) : 0
            }
        };
        o.meta = meta;
        return JSON.parse(JSON.stringify(o));
    }
};
