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
