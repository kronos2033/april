import { GetterTree, ActionTree, MutationTree } from "vuex";
import { IProduct } from "~/models";
import { filterByWord } from "~/utils";

const apiUrl = "https://fakestoreapi.com/products";
export const state = () => ({
  initialProducts: [] as IProduct[],
  filteredProducts: [] as IProduct[],
  pageableProducts: [] as IProduct[],
  searchWord: "",
  categoryOptions: [] as string[],
  selectedCategory: "",
  pageNumber: 1,
  pageSize: 6,
  totalPages: 1,
  isLoaded: false
});

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getProducts: state => state.initialProducts,
  getPageableProducts: state => state.pageableProducts,
  getSearchWord: state => state.searchWord,
  getCategories: state => state.categoryOptions,
  getSelectedCategory: state => state.selectedCategory,
  getPageNumber: state => state.pageNumber,
  getPageSize: state => state.pageSize,
  getTotalPages: state => state.totalPages,
  getIsLoaded: state => state.isLoaded,
};

export const mutations: MutationTree<RootState> = {
  setInitialProducts: (state, products: IProduct[]) => {
    state.initialProducts = products;
  },

  setFilteredProducts: (state) => {
    state.pageNumber = 1
    state.filteredProducts = [...state.initialProducts];
    if (state.selectedCategory) {
      state.filteredProducts = state.filteredProducts.filter(product => product.category === state.selectedCategory);
    }

    if (state.searchWord) {
      state.filteredProducts = state.filteredProducts.filter(product => filterByWord(product, state.searchWord));
    }
    const { pageNumber, pageSize, filteredProducts } = state;

    state.totalPages = Math.ceil(state.filteredProducts.length / state.pageSize);
    const lastIndex = pageNumber * pageSize;
    const firstIndex = lastIndex - pageSize;

    state.pageableProducts = filteredProducts.slice(firstIndex, lastIndex);
  },

  setPageableProducts: (state, pageableProducts: IProduct[]) => {
    state.pageableProducts = pageableProducts;
  },

  setSearchWord: (state, newWord: string) => {
    state.searchWord = newWord;
  },

  setTotalPages: (state, totalPages: number) => {
    state.totalPages = totalPages;
  },

  setCurrentPage: (state, page: number) => {
    state.pageNumber = page;
  },

  setCategoryOptions: state => {
    const categories: string[] = [];
    state.initialProducts.forEach(product => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    state.categoryOptions = categories;
  },

  setSelectedCategory: (state, newCategory: string) => {
    state.selectedCategory = newCategory;
  },

  setLoadedStatus: (state, isLoaded: boolean) => {
    state.isLoaded = isLoaded
  }
};

export const actions: ActionTree<RootState, RootState> = {
  fetchInitialData({ state, commit }) {
    commit("setLoadedStatus", false)
    this.$axios.$get<IProduct[]>(apiUrl)
      .then((res) => {
        commit("setInitialProducts", res);
        commit("setTotalPages", Math.ceil(res.length / state.pageSize));
        commit("setCategoryOptions");
        commit("setPageableProducts", res.slice(0, state.pageSize));
        commit("setFilteredProducts");
      })
      .catch(err => {
        throw new Error(`Ошибка инициализации данных: ${ err }`);
      })
      .finally(() => {
        setTimeout(()=> commit("setLoadedStatus", true), 300)
      })
  },

  fetchProducts({ state, commit }) {
    const { pageNumber, pageSize, filteredProducts } = state;
    const lastIndex = pageNumber * pageSize;
    const firstIndex = lastIndex - pageSize;
    commit("setPageableProducts", filteredProducts.slice(firstIndex, lastIndex));
  }
};
