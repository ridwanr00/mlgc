const tf = require('@tensorflow/tfjs-node')
const InputError = require('../exceptions/InputError')

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
    
        const prediction = model.predict(tensor)
        const score = await prediction.data()
        let label
        if (score[0] > 0.5) {
            label = 'Cancer'
        } else {
            label = 'Non-cancer'
        }
    
        let suggestion
        
        if (label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }
        if (label === 'Non-cancer') {
            suggestion = "Tetap jaga pola hidup yang sehat!"
        }
    
        return {label, suggestion}
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}

module.exports = predictClassification