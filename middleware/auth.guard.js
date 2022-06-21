function authenticated(req, res,next){
    if(!req.session.user){
        return res.redirect('/auth/login');
    }
    next();
}
function isSuperAdmin(req, res, next){
    if(req.session.user.company_id != 1000){
        return res.redirect('/auth/bookings');
    }
    next();
}

module.exports={
    authenticated,
    isSuperAdmin
}