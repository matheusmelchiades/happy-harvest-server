const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/system/toolbar',
        handler: handler.getToolbar
    },
    {
        method: 'GET',
        path: '/system/tabListing',
        handler: handler.getTablist
    }
];
