const Image = require('../models/image')
const fs = require('fs')
const path = require('path')

const deleteController = async (req, res) => {
    const imageId = Number(req.query.imageId)
    const image = await Image.findOne({ where: { id: imageId, user_id: req.user.id } })
    if (!image) {
        res.status(404).send('no such image')
        return
    }

    fs.unlinkSync(path.join(__dirname, `../public/uploads/${image.href}`))

    const count = await Image.destroy({ where: { id: imageId, user_id: req.user.id } })

    if (count > 0) res.status(200).send('successful')
    else res.status(404).send('no such image')
}

module.exports = deleteController
