function logErrores(err,req,res,next){
    console.log('log Errores')
    console.log(err)
    next(err)
}
function errorHandler(err,req,res,next){
    console.log('error handler')
    res.status(500).json({
        mensaje:err.message,
        stack:err.stack
    })
    next(err)
}
function boomErrorHandler (err,req,res,next){
    if(err.isBoom){
        const {output}=err;
    res.status(output.statusCode).json(output.payload)
    }
    next(err)
}
module.exports={logErrores, errorHandler,boomErrorHandler}