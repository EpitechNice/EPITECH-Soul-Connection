//Return another function in which there is the request response
export default (controllerFunc) => (req, res, next) =>
    Promise.resolve(controllerFunc(req, res, next)).catch(next);