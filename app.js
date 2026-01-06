const express = require('express')
const cors = require('cors')

const orderRoutes = require('./routes/orderRoutes')
const propertyRoutes = require('./routes/propertyRoutes')
const statisticsRoutes = require('./routes/statisticsRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/orders', orderRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/statistics', statisticsRoutes)

module.exports = app
