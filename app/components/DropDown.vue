<script setup lang="ts">
import { onClickOutside, useWindowSize } from '@vueuse/core'
import BottomSheet from '@douxcode/vue-spring-bottom-sheet'
import '@douxcode/vue-spring-bottom-sheet/dist/style.css'

defineProps({
  top: {
    type: Number,
    default: 32
  },
  bottom: {
    type: Number,
    default: undefined
  },
  left: {
    type: Number,
    default: undefined
  },
  right: {
    type: Number,
    default: undefined
  },
  zIndex: {
    type: Number,
    default: undefined
  }
})
const show = ref(false)
const wrap = ref()
onClickOutside(wrap, () => {
  show.value = false
})
function toggleShow() {
  show.value = !show.value
}
function closeDropDown() {
  show.value = false
}
const { width: windowWidth } = useWindowSize()

// const isMobile = computed(() => windowWidth.value < 640)
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = windowWidth.value < 640
})
watch(windowWidth, () => {
  isMobile.value = windowWidth.value < 640
})
</script>

<template>
  <div ref="wrap" class="relative" @click="toggleShow">
    <slot :active="show" />
    <div
      v-show="show && !isMobile"
      class="absolute z-50"
      :style="{
        top: !isMobile && bottom === undefined ? `${top}px` : undefined,
        bottom: !isMobile && bottom !== undefined ? `${bottom}px` : undefined,
        left: !isMobile && left !== undefined ? `${left}px` : undefined,
        right: !isMobile && right !== undefined ? `${right}px` : undefined,
        zIndex: zIndex
      }"
      @click.stop
    >
      <slot :close="closeDropDown" name="content" />
    </div>
    <ClientOnly>
      <BottomSheet v-if="isMobile" v-model="show">
        <slot :close="closeDropDown" name="content" />
      </BottomSheet>
    </ClientOnly>
  </div>
</template>

<style scoped>
</style>
