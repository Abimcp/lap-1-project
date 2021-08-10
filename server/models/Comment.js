const moment = require('moment');

class Comment {
    constructor(data) {
        this.message = data.message;
        this.timestamp = data.timestamp;
        this.fromNow = moment(data.timestamp).fromNow();
    }
}

module.exports = Comment;
