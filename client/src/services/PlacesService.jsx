const apiUrl = "https://localhost:5001/api/Places";

export const getAllPlaces = () => {
    return fetch(apiUrl)
    .then((res) => res.json())
};

export const getPlacesById = (id) => {
    return fetch(`${apiUrl}/${id}`)
    .then((res) => res.json())
};