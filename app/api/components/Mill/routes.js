module.exports = [
    {
        method: 'GET',
        path: '/mill',
        handler: (req, res) => {
            return res.send({ status: 'RUNNING MILL' });
        }
    }
];
