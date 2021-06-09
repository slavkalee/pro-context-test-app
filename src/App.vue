<template>
  <div class="container">
    <LeftBlock :lists="lists" v-if="leftsideVisible" :hide="hide" />
    <div class="show box" v-else>
      <button class="btn btn-icon" @click="show">
        <ShowLeftIcon />
      </button>
    </div>

    <RightBlock :lists="lists" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import LeftBlock from "@/components/layout/LeftBlock.vue";
import RightBlock from "@/components/layout/RightBlock.vue";

import { useStore } from "vuex";
import ShowLeftIcon from "./components/icons/ShowLeftIcon.vue";

export default defineComponent({
  name: "App",
  components: {
    LeftBlock,
    RightBlock,
    ShowLeftIcon,
  },
  setup() {
    const store = useStore();

    const leftsideVisible = ref(false);

    const show = () => (leftsideVisible.value = true);
    const hide = () => (leftsideVisible.value = false);

    return {
      lists: computed(() => store.getters.getAllLists),
      leftsideVisible,
      show,
      hide,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 20px;
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background: rgb(250, 249, 249);
}

.box {
  border: 1px solid #ccc;
  padding: 50px 20px;
  min-height: calc(100vh - 60px);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  position: relative;
  background: #fff;
}

.box-1 {
  width: 40%;
}
.box-2 {
  width: 100%;
  margin-left: 30px;
}

ul {
  list-style: none;
}

.btn {
  cursor: pointer;
  outline: 0;
  border: none;

  &-icon {
    background: transparent;
  }

  &-default {
    font-size: 15px;
    padding: 10px 15px;
    background: #0d9aec;
    color: #fff;
    border-radius: 15px;
  }

  &.selected {
    transform: rotate(90deg);
  }
}

.show {
  padding: 20px 10px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

input:indeterminate {
  background: white;
}
</style>
