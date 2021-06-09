import { List, Item, Color } from '@/interfaces';
import { createStore } from 'vuex';

export default createStore({
  state: {
    lists: [
      {
        id: 1,
        title: 'List 1',
      },
      {
        id: 2,
        title: 'List 2',
      },
    ] as List[],
    items: [
      {
        id: 1,
        listId: 1,
        title: 'Item 1',
        color: '#da2626',
        count: 10,
      },
      {
        id: 2,
        listId: 1,
        title: 'Item 2',
        color: '#44da26',
        count: 14,
      },
      {
        id: 3,
        listId: 1,
        title: 'Item 3',
        color: '#265fda',
        count: 42,
      },
      {
        id: 4,
        listId: 1,
        title: 'Item 4',
        color: '#f5e503',
        count: 5,
      },
      {
        id: 5,
        listId: 1,
        title: 'Item 5',
        color: '#000000',
        count: 21,
      },
      {
        id: 6,
        listId: 2,
        title: 'Item 1',
        color: '#da2626',
        count: 20,
      },
      {
        id: 7,
        listId: 2,
        title: 'Item 2',
        color: '#44da26',
        count: 5,
      },
      {
        id: 8,
        listId: 2,
        title: 'Item 3',
        color: '#265fda',
        count: 24,
      },
      {
        id: 9,
        listId: 2,
        title: 'Item 4',
        color: '#000000',
        count: 18,
      },
    ] as Item[],
    selectedItems: [] as Item[],
  },
  mutations: {
    addItem(state, payload: Item) {
      state.selectedItems.push(payload);
    },
    removeItem(state, id: number) {
      state.selectedItems = state.selectedItems.filter((item: Item) => {
        return id !== item.id;
      });
    },
    removeSquare(state, payload: Color) {
      state.items = state.items.map((item) => {
        if (payload.listId === item.listId && payload.color === item.color) {
          item.count = item.count - 1;
        }
        return item;
      });
    },
    addItemsByListId(state, listId: number) {
      const listItems = state.items.filter((item) => listId === item.listId);

      const uniqueSelectedItems = state.selectedItems.filter(
        (item) =>
          listItems.map((listItem) => listItem.id).indexOf(item.id) === -1
      );

      state.selectedItems = [...uniqueSelectedItems, ...listItems];
    },
    removeItemsByListId(state, listId: number) {
      state.selectedItems = state.selectedItems.filter(
        (item) => listId !== item.listId
      );
    },
    changeColor(state, payload) {
      state.items = state.items.map((item) => {
        if (payload.listId === item.id) {
          item.color = payload.color;
        }
        return item;
      });
    },
    incrementCount(state, id: number) {
      state.items = state.items.map((item) => {
        if (item.id === id) {
          item.count = item.count + 1;
        }
        return item;
      });
    },
    decrementCount(state, id: number) {
      state.items = state.items.map((item) => {
        if (item.id === id) {
          item.count = item.count - 1;
        }
        return item;
      });
    },
  },
  getters: {
    getAllLists(state) {
      return state.lists;
    },
    getSelectedItems(state) {
      return state.selectedItems;
    },
    getListItems: (state) => (listId: number) => {
      return state.items.filter((item) => listId === item.listId);
    },
    getSelectedListItems: (state) => (listId: number) => {
      return state.selectedItems.filter((item) => listId === item.listId);
    },
    isSelectedItem: (state) => (itemId: number) => {
      return !!state.selectedItems.find((item) => item.id === itemId);
    },
  },
});
