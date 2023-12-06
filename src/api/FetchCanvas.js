//The base API call which utilizes a Canvas url and specified options
//Routes the API through an Electron.js window call
export async function FetchCanvas(url, options) {
    console.log('URL: ', url);
    console.log('options:', options);
    try {
        const response = await window.api.FetchAPI(url, options)
        return await response;
    } catch (error) {
        throw error;
    }
}
