const asyncWrapper = (fn) => { //fn is short for function
    return async (req,res, next) => {
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)//passes to the next middleware which is errorHandlerMiddleware
        }
    }
}


module.exports= asyncWrapper