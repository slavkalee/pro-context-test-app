<template>
  <div class="box box-1">
    <div class="close">
      <button class="btn btn-icon" @click="hide">
        <CloseLeftIcon />
      </button>
    </div>
    <ul>
      <ListItem v-for="list of lists" :key="list.id" :list="list" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import ListItem from "@/components/ListItemLeft/List.vue";
import { List } from "@/interfaces";
import CloseLeftIcon from "../icons/CloseLeftIcon.vue";

export default defineComponent({
  components: {
    ListItem,
    CloseLeftIcon,
  },
  props: {
    lists: {
      type: Array as PropType<List[]>,
      required: true,
    },
    hide: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>

.close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
