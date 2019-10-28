const Sequelize = require('sequelize');

class SequelizeHandler {
    constructor(dbconfig) {
        this.db = {};
        this.config = dbconfig;
        this.models = {};
        this.dataTypes = Sequelize.DataTypes;
        this.operator = Sequelize.Op;
    }

    init() {
        this.db = new Sequelize(this.config);
    }

    connect() {
        return this.db.authenticate();
    }

    close() {
        return this.db.close();
    }

    defineModel(name = '', schema = {}, options = {}) {
        this.models[name] = this.db.define(name, schema, { ...options, modelName: name });

        return this.models[name];
    }

    truncate() {
        return Promise.all(
            Object.keys(this.models).map(key => {
                return this.models[key].destroy({ truncate: { cascade: true }, force: true });
            })
        );
    }
}

module.exports = SequelizeHandler;
