module.exports = [
    {
        method: 'GET',
        path: '/farm',
        handler: (req, res) => {
            return res.send({ status: 'RUNNING FARM' });
        }
    }
];
