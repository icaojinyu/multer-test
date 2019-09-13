const express = require('express')
const app = express()
const fs = require('fs')
// const path = require('path')

app.use(require('cors')())
app.use(express.json())
app.use('/upload', express.static('upload'))

const multer = require('multer')
const upload = multer({dest: './upload'})
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './upload')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// const upload = multer({storage: storage})

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  const file = req.file
  fs.renameSync('./upload/' + file.filename, './upload/' + file.originalname)
  res.send('上传成功！')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})