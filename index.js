const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

// this has to be the last loaded middleware.

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
