const express = require('express');
let adminRouter = express.Router();

// We Can use adminRouter.use instead of get and post , but it's specific to THIS Router

function validateUser( req, res, next){

    res.locals.validated = true;
    console.log("Validated True!");
    next();
}

adminRouter.use(validateUser);

adminRouter.get('/', ( req, res, next ) => {
    
    res.json({
        msg: "Router Admin Works!"
    });

});

adminRouter.get('/search', (req, res, next) => {
    res.json({"msg":"Admin Search Operation"});
});

module.exports = adminRouter;