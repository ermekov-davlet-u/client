export  async function queryServer <T>( url: string, method: string = "GET", body: any = null, headers: Headers = new Headers() ): Promise<T> {
    if(method != "GET"){
        body = JSON.stringify(body)
        await headers.set('Content-Type', 'application/json');
        // await headers.set('Accept', 'application/json');
    }
    // var newurl = new URL(url),
    // params: {
    //     [key: string] : string | number
    // } = {lang: "en"}
    // await Object.keys(params).forEach(key => newurl.searchParams.append(key, String(params[key])))
    const response = await fetch( url, { method: method, headers, body } )
    const data = await response.json()
    return data


}
