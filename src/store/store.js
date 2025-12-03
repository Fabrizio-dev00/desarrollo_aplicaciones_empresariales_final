import { create } from 'zustand'
import { getApiConfig } from '../config/apiConfig'

const useStore = create((set, get) => ({
  items: [],
  allItems: [],
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  error: null,
  apiConfig: getApiConfig(),

  fetchItems: async (page = 1) => {
    const config = get().apiConfig
    set({ isLoading: true, error: null })

    try {
      const response = await fetch(config.getUrl(page))
      const data = await response.json()
      const rawItems = config.getData(data)

      // Mapear items al formato genérico
      const mappedItems = rawItems.map((item, index) => 
        config.mapItem(item, index, page)
      )

      if (config.manualPagination) {
        // Para APIs sin paginación nativa (countries, jsonplaceholder)
        const itemsPerPage = config.itemsPerPage || 20
        const totalPages = Math.ceil(mappedItems.length / itemsPerPage)
        const start = (page - 1) * itemsPerPage
        const paginatedItems = mappedItems.slice(start, start + itemsPerPage)

        set({
          allItems: mappedItems,
          items: paginatedItems,
          totalPages,
          currentPage: page,
          isLoading: false,
        })
      } else {
        // Para APIs con paginación nativa (rickandmorty, dragonball, pokemon)
        set({
          items: mappedItems,
          totalPages: config.getTotalPages(data),
          currentPage: page,
          isLoading: false,
        })
      }
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  // Para paginación manual (cambiar página sin nuevo fetch)
  setPage: (page) => {
    const { allItems, apiConfig } = get()
    if (apiConfig.manualPagination && allItems.length > 0) {
      const itemsPerPage = apiConfig.itemsPerPage || 20
      const start = (page - 1) * itemsPerPage
      set({
        items: allItems.slice(start, start + itemsPerPage),
        currentPage: page,
      })
    }
  },
}))

export default useStore