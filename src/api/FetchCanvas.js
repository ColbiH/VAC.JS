export async function FetchCanvas(url, options) {
    try {
        const response = await window.api.FetchAPI(url, options)
        console.log(response);
        return await response;
    } catch (error) {
        throw error;
    }
}
