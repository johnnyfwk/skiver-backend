function handle404Errors(request, response, next) {
    response.status(404).send( { "msg": "This path does not exist." } );
}

function handleCustomErrors(error, request, response, next) {
    if (error.status && error.msg) {
        response.status(error.status).send( { "msg": error.msg } )
    }
    else {
        next(error);
    }
}

function handle500Errors(error, request, response, next) {
    console.log(error);
    response.status(500).send( { "msg": "Internal server error." } );
}

module.exports = {
    handle404Errors,
    handleCustomErrors,
    handle500Errors
};