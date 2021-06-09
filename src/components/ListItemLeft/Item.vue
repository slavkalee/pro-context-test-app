<template>
  <li class="item">
    <div class="item__leftside">
      <input
        class="item__checkbox"
        type="checkbox"
        :checked="isChecked"
        @change="toggle"
      />
      <span>{{ item.title }}</span>
    </div>
    <div class="item__rightside">
      <div class="item__count--block">
        <div class="arrows" v-if="arrowsVisible">
          <button class="btn btn-icon arrow-up" @click="increment">
            <IncrementIcon />
          </button>
          <button
            class="btn btn-icon arrow-down"
            @click="decrement"
            :disabled="item.count === 0"
          >
            <DecrementIcon />
          </button>
        </div>
        <div
          class="item__count"
          @click="setArrowsVisible"
        >
          {{ item.count }}
        </div>
      </div>
      <div class="item__color">
        <input
          type="color"
          :value="item.color"
          @input="handleColor($event, item.id)"
        />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Item } from "@/interfaces";
import { computed, defineComponent, PropType, ref } from "vue";
import { useStore } from "vuex";
import DecrementIcon from "../icons/DecrementIcon.vue";
import IncrementIcon from "../icons/IncrementIcon.vue";

export default defineComponent({
  components: { IncrementIcon, DecrementIcon },
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const arrowsVisible = ref(false);

    const setArrowsVisible = () => (arrowsVisible.value = !arrowsVisible.value);

    const isChecked = computed<boolean>(() =>
      store.getters.isSelectedItem(props.item.id)
    );

    const handleColor = (e: Event, listId: number) => {
      store.commit("changeColor", {
        listId,
        color: (e.target as HTMLInputElement).value,
      });
    };

    const toggle = () => {
      if (isChecked.value) {
        store.commit("removeItem", props.item.id);
      } else {
        store.commit("addItem", props.item);
      }
    };

    const increment = () => store.commit("incrementCount", props.item.id);
    const decrement = () => store.commit("decrementCount", props.item.id);

    return {
      isChecked,
      toggle,
      handleColor,
      increment,
      decrement,
      arrowsVisible,
      setArrowsVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  min-width: 375px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  &__leftside {
    & span {
      margin-left: 10px;
    }
  }
  &__rightside {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50px;
    position: relative;
  }

  &__count {
    cursor: pointer;
  }
  &__color {
    width: 20px;
    height: 20px;
    overflow: hidden;
    position: relative;

    input[type="color"] {
      border: none;
      outline: 0;
      width: 40px;
      height: 40px;
      background: transparent;
      position: absolute;
      top: -5px;
      left: -5px;
    }
  }
  &__count--block {
    display: flex;
    align-items: center;
    position: relative;
  }
  .arrows {
    position: absolute;
    top: -12px;
    left: -28px;
    display: flex;
    flex-direction: column;
  }
  .arrow-up,
  .arrow-down {
    height: 14px;
  }
  .arrow-up {
    svg {
      transform: rotate(180deg);
    }
  }
}
</style>