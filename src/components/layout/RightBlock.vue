<template>
  <div class="box box-2">
    <ul>
      <ListItem v-for="list of lists" :key="list.id" :list="list" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { List } from "@/interfaces";
import ListItem from '@/components/ListItemRight/List.vue'

export default defineComponent({
  components: {
    ListItem,
  },
  props: {
    lists: {
      type: Array as PropType<List[]>,
      required: true,
    },
  },
})
</script>