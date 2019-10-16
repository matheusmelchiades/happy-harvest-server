module.exports = [
    {
        method: 'GET',
        path: '/field',
        handler: (req, res) => {
            return res.send({ status: 'RUNNING FIELD' });
        }
    }
];
