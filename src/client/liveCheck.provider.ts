class LiveCheckProvider {
    async get() {
        const response = await fetch('http://localhost:4000/liveCheck')

        const body = await response.json()

        console.log(body, response.headers, response.status);


        return {
            status: response.status,
            body
        }
    }
}

new LiveCheckProvider().get()