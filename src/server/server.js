const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const InputError = require('../exceptions/InputError')
require('dotenv').config()
const loadModel = require('../services/loadModel')

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    const model = await loadModel()
    server.app.model = model

    server.route(routes)

    server.ext('onPreResponse', function (request, h) {
        const response = request.response
        if (response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi'
            })
            newResponse.code(response.statusCode)
            return newResponse
        }

        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(413)
            return newResponse
        }

        return h.continue
    })

    await server.start()
    console.log(`Server starts at: ${server.info.uri}`)
}

init()