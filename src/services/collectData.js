const {Firestore} = require('@google-cloud/firestore')

async function collectData() {
    const db = new Firestore({
        projectId: 'submissionmlgc-ridwanrasyid'
    })
    const predictionRef = db.collection('predictions')
    const snapshot = await predictionRef.get()
    const history = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            history: {
                ...doc.data()
            }
        }
    })
    return history
}

module.exports = collectData