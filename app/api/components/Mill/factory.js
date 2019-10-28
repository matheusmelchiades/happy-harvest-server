module.exports.listing = mills => ({
    count: mills.count,
    headers: Object.keys(mills.rows[0] ? mills.rows[0].dataValues : []),
    rows: mills.rows
});
