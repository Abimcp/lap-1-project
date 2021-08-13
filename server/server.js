const server = require('./app');

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`\nApp listening at port 3000!\n`));
