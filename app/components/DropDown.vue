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

const { width: windowWidth } = useWindowSize()
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = windowWidth.value < 640
})
watch(windowWidth, () => {
  isMobile.value = windowWidth.value < 640
})
const bottomSheet = ref<InstanceType<typeof BottomSheet>>()
const show = ref(false)
const wrap = ref()
onClickOutside(wrap, () => {
  closeDropDown()
})
function toggleShow() {
  show.value = !show.value
  if (isMobile.value) {
    if (show.value) {
      bottomSheet.value?.open()
    }
    else {
      bottomSheet.value?.close()
    }
  }
}
function closeDropDown() {
  show.value = false
  if (isMobile.value) {
    bottomSheet.value?.close()
  }
}
</script>

<template>
  <div ref="wrap" class="relative" @click="toggleShow">
    <slot :active="show" />
    <div
      v-show="show && !isMobile"
      class="absolute z-50"
      :style="{
        top: bottom === undefined ? `${top}px` : undefined,
        bottom: bottom !== undefined ? `${bottom}px` : undefined,
        left: left !== undefined ? `${left}px` : undefined,
        right: right !== undefined ? `${right}px` : undefined,
        zIndex: zIndex
      }"
      @click.stop
    >
      <slot :close="closeDropDown" name="content" />
    </div>
    <ClientOnly>
      <BottomSheet v-if="isMobile" ref="bottomSheet">
        <slot :close="closeDropDown" name="content" />
      </BottomSheet>
    </ClientOnly>
  </div>
</template>

<style scoped>
</style>
