const Router = require('express').Router();
const path = require('path');
const glob = require('glob');

const PATH_ROUTES = path.resolve(process.cwd(), 'app', '**', '**routes.js');

const configGlob = {
    nodir: true,
    strict: true
};

const sampleRoute = {
    method: true,
    path: true,
    handler: true,
    pathsAlready: [],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

function loadRoutes() {
    return glob
        .sync(PATH_ROUTES, configGlob)
        .map(file => require(file))
        .flat()
        .filter(validateRoute);
}

function validateMethod(method = '') {
    return sampleRoute.methods.includes(method.toUpperCase());
}

function validatePath(path) {
    const includes = path.includes('/') && sampleRoute.pathsAlready.includes(path);

    if (!includes) {
        sampleRoute.pathsAlready.push(path);

        return true;
    }

    return false;
}

function validateRoute(route) {
    try {
        const valid = Object.entries(route).every(([key, value]) => {
            if (!sampleRoute[key]) return false;

            return key === 'method' ? validateMethod(value) : key === 'path' ? validatePath(value) : true;
        });

        if (!valid) throw new Error('ERROR IN ROUTER');

        return valid;
    } catch (err) {
        genericError(err.message, route);
        process.exit(0);
    }
}

function genericError(message, route) {
    console.log('================================');
    console.log(`==  ${message}`);
    if (route) console.log('== ' + JSON.stringify(route));
    console.log('================================');
}

exports.load = app => {
    const routes = loadRoutes();

    routes.forEach(({ method, path, handler }) => {
        const methodFormated = method.toLowerCase();

        Router[methodFormated](path, handler);
    });

    app.use(Router);
};
