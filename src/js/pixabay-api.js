import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "46859075-3fccd495eb65e9407cc96c329";

export async function fetchImages(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  try {
    const response = await axios(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching images');
  }
}
