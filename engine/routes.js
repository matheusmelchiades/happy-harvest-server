const Router = require('express').Router();
const path = require('path');
const glob = require('glob');
const expressValidator = require('express-validator');
const handlerError = require('../helper/handlerErrors');

const PATH_ROUTES = path.resolve(process.cwd(), 'app', '**', '**routes.js');
const pathsAlreadyUsed = [];
const fieldsRouteRequired = ['method', 'path', 'handler'];
const fieldsAllow = [...fieldsRouteRequired, 'validations'];
const methodsPossible = ['GET', 'POST', 'PUT', 'DELETE'];

const configGlob = {
    nodir: true,
    strict: true
};

function loadRoutes() {
    return glob
        .sync(PATH_ROUTES, configGlob)
        .map(file => require(file))
        .flat()
        .filter(validateRoute)
        .map(removeFieldsInvalids);
}

function validateMethod(method = '') {
    return methodsPossible.includes(method);
}

function validatePath(path = '', method = '') {
    const newPath = `${method}::${path}`;
    const includes = pathsAlreadyUsed.includes(newPath);

    if (!includes && path.includes('/')) {
        pathsAlreadyUsed.push(newPath);

        return true;
    }

    return false;
}

function validationFields(route) {
    const hasAllFieldsRequired = Object.keys(route).filter(field => fieldsRouteRequired.includes(field));

    return hasAllFieldsRequired.length === fieldsRouteRequired.length;
}

function validateValidations(validations) {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = expressValidator.validationResult(req);

        if (!errors.isEmpty()) {
            const unique = (prev, next) => {
                const exists = err => err.param === next.param;

                if (!prev.some(exists)) {
                    return [...prev, next];
                }

                return prev;
            };

            const dataErrors = errors.array().reduce(unique, []);

            return res.boom.badData(handlerError.invalidParam(), { errors: dataErrors });
        }

        return next();
    };
}

function removeFieldsInvalids(route) {
    const validateField = ([key, value]) => (fieldsAllow.includes(key) ? [key, value] : null);

    return Object.fromEntries(
        Object.entries(route)
            .map(validateField)
            .filter(obj => !!obj)
    );
}

function validateRoute(route) {
    try {
        const error = new Error('ERROR IN ROUTER');

        if (!validationFields(route)) throw error;

        if (!validateMethod(route.method)) throw error;

        if (!validatePath(route.path, route.method)) throw error;

        return true;
    } catch (err) {
        console.log(handlerError.errorRouter(err.message, route));
        process.exit(0);
    }
}

function formatValidations(validations) {
    return Object.entries(validations)
        .map(([key, value]) => (value.length ? value : null))
        .filter(value => !!value)
        .flat();
}

exports.load = app => {
    const routes = loadRoutes();

    routes.forEach(({ method, path, handler, validations }) => {
        const methodFormated = method.toLowerCase();

        if (validations) {
            validations = formatValidations(validations);
            validations = validateValidations(validations);
        }

        Router[methodFormated](path, validations, handler);
    });

    app.use(Router);
};
