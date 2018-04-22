"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function forceDirectory(req, res, next) {
    if (req.path == "/") {
        if (req.originalUrl.startsWith(req.baseUrl + "/")) {
            res.redirect(307, req.baseUrl + req.url);
        }
        else {
            next();
        }
    }
    else {
        if (!req.path.endsWith("/")) {
            res.redirect(307, req.baseUrl + req.url.replace(req.path, req.path + "/"));
        }
        else {
            next();
        }
    }
}
exports.forceDirectory = forceDirectory;
function slice(obj, ...props) {
    let result = {};
    for (let prop of props) {
        if (prop in obj) {
            result[prop] = obj[prop];
        }
    }
    return result;
}
exports.slice = slice;
function assign(target, source, ...props) {
    for (let prop of props) {
        if (prop in source) {
            target[prop] = source[prop];
        }
    }
}
exports.assign = assign;
//# sourceMappingURL=util.js.map