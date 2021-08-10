const moment = require('moment');
const Comment = require('./Comment');

class Post {
    constructor(data) {
        this.id = data.id;
        this.message = data.message;
        this.gif = data.gif || null;
        this.timestamp = data.timestamp;
        this.fromNow = moment(data.timestamp).fromNow();
        this.like = 0;
        this.thumpsUp = 0;
        this.clap = 0;
        this.comments = data.comments || [];
    }

    addComment(data) {
        const comment = new Comment(data);
        this.comments.unshift(comment);
    }

    addReaction(reaction) {
        switch (reaction) {
            case 'like':
                this.like++;
                break;
            case 'thumbsUp':
                this.thumpsUp++;
                break;
            case 'clap':
                this.clap++;
                break;
        }
    }
}

module.exports = Post;
