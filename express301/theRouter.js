const express = require('express');
let router = express.Router();

// Instead of app.get we will use router.get(...)

router.get('/', ( req, res, next ) => {

    res.json({
        msg: "Router Works!"
    });

});





module.exports = router;

