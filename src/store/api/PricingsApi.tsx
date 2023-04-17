export const getPricingsRequest = async () => {
    const response = await fetch("http://localhost:8080/pricings");
    return response.json()
}