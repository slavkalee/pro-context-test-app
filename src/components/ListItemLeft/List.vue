<template>
  <li class="list">
    <div
      class="list__info"
      :style="itemsVisible ? 'align-items: flex-start' : 'align-items: center'"
    >
      <div class="list__btn">
        <button
          class="btn btn-icon"
          :class="{ selected: itemsVisible }"
          @click="toggleVisible"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.16504 20.13L7.93504 21.9L17.835 12L7.93504 2.10001L6.16504 3.87001L14.295 12L6.16504 20.13H6.16504Z"
              fill="black"
              fill-opacity="0.54"
            />
          </svg>
        </button>
      </div>
      <div class="list__checkbox">
        <input
          type="checkbox"
          v-model="allSelected"
          :indeterminate="checkbox.hasSelected && checkbox.notAllSelected"
        />
      </div>
      <div class="list__name">
        {{ list.title }}
        <div class="list__items" v-show="itemsVisible">
          <ul>
            <Item v-for="item of items" :key="item.id" :item="item" />
          </ul>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";

import Item from "@/components/ListItemLeft/Item.vue";
import { Checkbox, List } from "@/interfaces";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Item,
  },
  props: {
    list: {
      type: Object as PropType<List>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const itemsVisible = ref(false);

    const checkbox = reactive<Checkbox>({
      notAllSelected: false,
      hasSelected: false,
    });

    const items = computed(() => store.getters.getListItems(props.list.id));

    const selectedItems = computed(() =>
      store.getters.getSelectedListItems(props.list.id)
    );

    const allSelected = computed({
      get: () => selectedItems.value.length === items.value.length,
      set: (val) => {
        val = !val;
        if (val) {
          store.commit("removeItemsByListId", props.list.id);
        } else {
          store.commit("addItemsByListId", props.list.id);
        }
      },
    });

    watch(
      () => selectedItems.value,
      () => {
        checkbox.hasSelected = !!selectedItems.value.length;
        checkbox.notAllSelected =
          selectedItems.value.length < items.value.length;
      }
    );

    const toggleVisible = () => (itemsVisible.value = !itemsVisible.value);

    return {
      items,
      itemsVisible,
      toggleVisible,
      checkbox,
      allSelected,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  &:not(:last-child) {
    margin-bottom: 15px;
  }

  &__items {
    margin-top: 20px;
  }

  &__info {
    display: flex;

    & * {
      margin-right: 5px;
    }
  }
}
</style>