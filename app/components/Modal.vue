<script setup lang="ts">
import type { ModalOptions } from '~/composables/useModal'
import { useWindowSize } from '@vueuse/core'
import BottomSheet from '@douxcode/vue-spring-bottom-sheet'
import '@douxcode/vue-spring-bottom-sheet/dist/style.css'

defineOptions({
  inheritAttrs: false
})
const defaultOptions = {
  title: '',
  content: '',
  type: 'info',
  showCancelButton: false,
  cancelButtonText: '',
  confirmButtonText: 'OK',
  maskClosable: true,
  toast: false,
  modalClass: 'bg-front w-80 md:w-96 p-6 rounded-3xl shadow-xl',
  mobileWidth: 640
}
const props = withDefaults(defineProps<ModalOptions>(), {
  title: '',
  content: '',
  type: 'info',
  showCancelButton: false,
  cancelButtonText: '',
  confirmButtonText: 'OK',
  maskClosable: true,
  toast: false,
  modalClass: 'bg-front w-80 md:w-96 p-6 rounded-3xl shadow-xl',
  mobileWidth: 640
})

const model = defineModel<boolean>()
const emit = defineEmits<{
  (e: 'confirm' | 'cancel'): void
}>()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= props.mobileWidth)
const isVisible = ref(false)
const bottomSheet = ref<InstanceType<typeof BottomSheet>>()
watch(model, () => {
  isVisible.value = !!model.value
  if (isVisible.value) {
    bottomSheet.value?.open()
  }
  else {
    bottomSheet.value?.close()
  }
}, { immediate: true })
const options = ref(Object.assign({}, defaultOptions))
watch(() => props, () => {
  options.value = Object.assign({}, defaultOptions, props)
}, { deep: true, immediate: true })

const p: { resolve: any, reject: any } = {
  resolve: null,
  reject: null
}
const open = (opts: ModalOptions) => {
  return new Promise((resolve, reject) => {
    p.resolve = resolve
    p.reject = reject
    isVisible.value = true
    options.value = Object.assign({}, defaultOptions, opts)
  })
}

const close = () => {
  isVisible.value = false
  model.value = false
  emit('cancel')
  p.reject?.()
}
function maskClose() {
  if (options.value.maskClosable) {
    close()
  }
}
function confirmClick() {
  isVisible.value = false
  model.value = false
  emit('confirm')
  p.resolve?.()
}

defineExpose({ open, close })
</script>

<template>
  <div v-if="!isMobile || (isMobile && !$slots.default)">
    <transition name="fade" :duration="150">
      <div v-if="isVisible && !options.toast" class="fixed z-50 top-0 left-0 w-full h-full bg-black/50 dark:bg-black/80 backdrop-blur-sm" @click="maskClose" />
    </transition>
    <transition name="fade-down" :duration="150">
      <div
        v-show="isVisible"
        class="fixed z-50 left-[50%] -translate-x-[50%]"
        :class="[options.modalClass, options.toast ? 'border border-main top-6' : 'top-[50%] -translate-y-[50%]']"
      >
        <button v-if="options.maskClosable && !options.toast" class="text-xl w-8 h-8 rounded-lg flex justify-center items-center md:hover:bg-rose-500 md:hover:border-rose-500 md:hover:text-white absolute top-3 right-3" @click="close">
          <i class="icon-[material-symbols--close]" role="img" aria-hidden="true" />
        </button>
        <template v-if="$slots.default">
          <div class="flex flex-col h-full">
            <div class="shrink-0">
              <slot name="header" :is-mobile="isMobile" />
            </div>
            <div class="flex-grow overflow-auto overscroll-contain">
              <slot :is-mobile="isMobile" />
            </div>
            <div class="shrink-0">
              <slot name="footer" :is-mobile="isMobile" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex shrink-0">
            <div class="flex" :class="options.toast ? 'text-2xl mr-3' : 'text-4xl mr-4'">
              <i v-if="options.type === 'info'" class="icon-[hugeicons--information-circle]" role="img" aria-hidden="true" />
              <i v-if="options.type === 'success'" class="icon-[hugeicons--checkmark-circle-04] text-green-500" role="img" aria-hidden="true" />
              <i v-if="options.type === 'warning'" class="icon-[hugeicons--alert-01] text-yellow-500" role="img" aria-hidden="true" />
              <i v-if="options.type === 'error'" class="icon-[hugeicons--alert-circle] text-red-500" role="img" aria-hidden="true" />
            </div>
            <div class="space-y-4 flex flex-col justify-center">
              <h3 v-if="options.title" class="text-lg font-semibold color-title" :class="{ 'pr-6': options.maskClosable && !options.toast }">{{ options.title }}</h3>
              <p v-if="options.content" :class="options.title ? 'text-sm' : options.maskClosable && !options.toast ? 'color-action pr-6' : 'color-action'">{{ options.content }}</p>
            </div>
          </div>
          <div v-if="!options.toast" class="flex justify-end space-x-3 mt-9">
            <button v-if="options.showCancelButton" class="px-4 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 color-action" @click="close">
              {{ options.cancelButtonText }}
            </button>
            <button class="px-4 h-9 rounded-lg bg-primary-500 text-white" @click="confirmClick">
              {{ options.confirmButtonText }}
            </button>
          </div>
        </template>
      </div>
    </transition>
  </div>
  <ClientOnly v-if="isMobile && $slots.default">
    <BottomSheet ref="bottomSheet" :teleport-defer="true" v-bind="$attrs" @closed="close">
      <template #header><slot name="header" :is-mobile="isMobile" /></template>
      <slot :is-mobile="isMobile" />
      <template #footer><slot name="footer" :is-mobile="isMobile" /></template>
    </BottomSheet>
  </ClientOnly>
</template>

<style scoped>

</style>
