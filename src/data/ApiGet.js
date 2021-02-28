export async function ApiGet(url) {
    if (!url) return null
    else {
        const axois = require('axios').default
        return axois.get(url)
            .then((x) => {
                return x.data
            })
    }
}