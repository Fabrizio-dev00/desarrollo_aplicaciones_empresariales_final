const API_CONFIGS = {
  jikanapi: {
    name: 'jikanapi Anime',
    baseUrl: 'https://api.jikan.moe/v4/top/anime?type=ona',
    getUrl: (page) => 'https://api.jikan.moe/v4/top/anime?type=ona&page=' + page,
    getData: (response) => response,
    getTotalPages: () => 1,
    mapItem: (item) => ({
      id: item.id,
      title: item.name,
      image: `https://i.pravatar.cc/300?u=${item.email}`,
      subtitle: item.email,
      badge: item.company?.name || '',
      extra: item.address?.city || '',
    }),
    manualPagination: true,
    itemsPerPage: 6,
  },
}

export const CURRENT_API = 'jikanapi'

export const getApiConfig = () => API_CONFIGS[CURRENT_API]

export default API_CONFIGS