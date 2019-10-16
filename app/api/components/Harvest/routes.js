module.exports = [
    {
        method: 'GET',
        path: '/harvest',
        handler: (req, res) => {
            return res.send({ status: 'RUNNING HARVEST' });
        }
    }
];
