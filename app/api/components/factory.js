function buildHeaders(data) {
    const [firstItem = {}] = data.rows;

    return Object.keys(firstItem.dataValues || {}).map(name => {
        const attibutes = firstItem.rawAttributes;
        const type = attibutes[name].type.constructor.name.toLowerCase();

        return { name, type };
    });
}

module.exports.listing = data => ({
    count: data.count,
    headers: buildHeaders(data),
    rows: data.rows
});
