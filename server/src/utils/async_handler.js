const asyncHandler = (reqHandler) => { // This is a higher order function which takes a request handler function as an argument
    return (req, res, next) => { 
        Promise // here Promise is used to handle the asynchronous code in a synchronous way 
        .resolve(reqHandler(req, res, next)) // here reqHandler is the request handler function which is passed as an argument to asyncHandler function
        .catch((err)=>next(err)) // here next is the error handling middleware
    }
}

export default asyncHandler;