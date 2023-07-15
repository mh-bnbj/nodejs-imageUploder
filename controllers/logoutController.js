const logoutController = async (req, res) => {
    req.logout((err) => {
        if (err) {
            alert('failed to log out from account')
            res.redirect('/')
        } else {
            req.flash('success', 'loged out successfully')
            res.redirect('/login')
        }
    })
}

module.exports = logoutController
