// src/config/apiConfig.js

const API_CONFIGS = {
  jikananime: {
    name: 'Jikan Anime',
    baseUrl: 'https://api.jikan.moe/v4/anime',
    getUrl: (page = 1) =>
      `https://api.jikan.moe/v4/anime?page=${page}&limit=20`,

    getData: (response) => response.data,
    getTotalPages: (response) =>
      response.pagination?.last_visible_page ?? 1,
    mapItem: (item, index, page) => ({
      id: item.mal_id,
      title: item.title,               
      image: item.images?.jpg?.image_url,
      subtitle: item.type || 'Anime',  
      badge: `#${(page - 1) * 20 + index + 1}`,
      extra: item.score != null ? `Score: ${item.score}` : '',
    }),
  },
};

export const CURRENT_API = 'jikananime';
export const getApiConfig = () => API_CONFIGS[CURRENT_API];
export default API_CONFIGS;
