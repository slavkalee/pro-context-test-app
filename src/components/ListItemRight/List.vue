<template>
  <li class="list">
    <div class="list__header">
      <div class="list__name">{{ list.title }}</div>
      <div class="list__btn--container">
        <button
          class="btn btn-default"
          @click="sortedState = !sortedState"
          v-if="items.length"
        >
          {{ sortedState ? "Сортировать" : "Перемешать" }}
        </button>
      </div>
    </div>

    <div class="list__items item" v-if="!sortedState && items.length">
      <div class="item__row" v-for="item of items" :key="item.id">
        <div
          class="item__square"
          v-for="(square, index) of [...Array(item.count)].fill(item.color)"
          :key="square + index"
          :style="{ background: item.color }"
          @click="removeSquare(item.listId, square)"
        ></div>
      </div>
    </div>

    <div class="list__items item" v-if="sortedState && items.length">
      <div class="item__row" v-if="shuffledArrayOfColors.length">
        <div
          class="item__square"
          v-for="(square, index) of shuffledArrayOfColors"
          :key="square + index"
          :style="{ background: square.color }"
          @click="removeSquare(square.listId, square.color)"
        ></div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { useStore } from "vuex";

import { Item, List, Color } from "@/interfaces";
import { shuffleArray } from "@/utils";

export default defineComponent({
  props: {
    list: {
      type: Object as PropType<List>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const sortedState = ref(false);
    const shuffledArrayOfColors = ref<string[]>();

    const items = computed(() =>
      store.getters.getSelectedListItems(props.list.id)
    );

    const allColors = computed(() => {
      return items.value.reduce((acc: Color[], item: Item) => {
        watch(() => item.count, setShuffledArray);

        for (let i = 0; i < item.count; i++) {
          const { listId, color } = item;
          acc.push({ listId, color });
        }
        return acc;
      }, [] as Color[]);
    });

    function setShuffledArray() {
      shuffledArrayOfColors.value = shuffleArray(allColors.value);
    }

    watch(() => sortedState.value, setShuffledArray);
    watch(() => items.value.length, setShuffledArray);

    const removeSquare = (listId: number, color: string) => {
      store.commit("removeSquare", {
        listId,
        color,
      });
    };

    return {
      items,
      shuffledArrayOfColors,
      sortedState,
      removeSquare,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding: 20px;
  border: 1px solid #ccc;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.item {
  &__row {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &__square {
    margin: 0 5px 5px 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>