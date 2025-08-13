<script setup>
const error = useError()
const { t } = useI18n()
useHead({
  title: `${error.value?.statusCode} - ${error.value?.url}`
})

watch(error, () => {
  if (error.value.statusCode === 404 && error.value.message.includes('/_nuxt/builds/meta') && typeof window !== 'undefined') {
    window.location.reload()
  }
}, {
  immediate: true
})
function refresh() {
  window.location.reload()
}
</script>

<template>
  <div class="m-6">
    <h2 class="text-4xl color-title">{{ error.statusCode }}</h2>
    <div class="mt-4">{{ error.message }}</div>
    <pre class="card p-6 rounded-2xl mt-4 max-h-64 overflow-auto">
      <code v-html="error.stack" />
    </pre>
    <button class="mt-6 px-4 py-2 rounded-lg bg-primary-500 text-white center cursor-pointer w-full" @click="refresh">{{ t('retry') }}</button>
  </div>
</template>

<style scoped></style>
