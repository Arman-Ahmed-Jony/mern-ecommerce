// const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const fileUploadDir = path.join(__dirname, '../public/uploads')

// TODO: need to reimplement this
exports.upload = function (file) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(fileUploadDir)) {
      fs.mkdir(fileUploadDir, { recursive: true }, (err) => {
        if (err) reject(err)
      })
    }

    const oldPath = file.tempFilePath
    const fileName = `${uuidv4()}-${file.name}`
    const newPath = path.join(fileUploadDir, `${fileName}`)
    let rawData = fs.readFileSync(oldPath)
    fs.writeFile(newPath, rawData, function (err) {
      if (err) {
        reject(err)
      }
      resolve(`/uploads/${fileName}`)
    })
  })
}

exports.fileUploadDir = fileUploadDir
