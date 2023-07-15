const Image = require('../models/image')

const post = async (req, res) => {
    await Image.create({
        title: req.body.title,
        href: `${req.file.filename}`,
        created_date: new Date(),
        user_id: req.user.id,
    })
    res.status(200).send('successful')
}

module.exports = {
    post,
}
