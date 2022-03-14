const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')
const path = require('path')

dotenv.config()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useFindAndModify: false,
  })
  .then(console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
})

// const upload = multer({ storage: storage })
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   res.status(200).json('File has been uploaded')
// })

// app.use('/api/auth', authRoute)
// app.use('/api/users', userRoute)
// app.use('/api/posts', postRoute)
// app.use('/api/categories', categoryRoute)

// app.listen('5000', () => {
//   console.log('Backend is running.')
// })

// app.use((req, res, next) => {
//   const whitelist = process.env.WHITELIST?.split(' ')
//   const origin = req.headers.origin ? req.headers.origin : req.referer
//   console.log(`whitelist: ${whitelist}`)
//   console.log(`origin: ${origin}`)
//   if (whitelist.includes(origin)) {
//     console.log('Setting Access-Control-Allow-Origin header')
//     res.setHeader('Access-Control-Allow-Origin', origin)
//   }
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//   res.header('Access-Control-Allow-Credentials', true)
//   return next()
// })
