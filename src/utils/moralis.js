const Moralis = require('moralis/node');

const serverUrl = 'https://xdwpxmthbr7x.usemoralis.com:2053/server';
const appId = 'ZQKlp0YWUD7FN9d8ROABwY6pdxdPb8RqA6zyIRhp';

Moralis.start({ serverUrl, appId });

export default Moralis;
