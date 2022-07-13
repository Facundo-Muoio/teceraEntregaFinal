const logOut = (req, res) => {
    req.logout((err) => {
                if(err){
                    logger.error(err)
                } res.redirect('/');
    });   
}

module.exports = logOut