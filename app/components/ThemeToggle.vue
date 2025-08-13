<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()
function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div
    class="sm:tooltip tooltip-down text-xl cursor-pointer items-center relative w-9 h-9 rounded-lg center md:hover:bg-gray-200 md:dark:hover:bg-gray-700 color-action"
    :data-tip="colorMode.value === 'light' ? t('darkTip') : t('lightTip')"
    @click="toggleTheme"
  >
    <i v-show="colorMode.value === 'system'" class="icon-[hugeicons--modern-tv]" role="img" aria-hidden="true" />
    <i v-show="colorMode.value === 'light'" class="icon-[hugeicons--sun-02]" role="img" aria-hidden="true" />
    <i v-show="colorMode.value === 'dark'" class="icon-[hugeicons--moon-02]" role="img" aria-hidden="true" />
  </div>
</template>

<style scoped></style>
