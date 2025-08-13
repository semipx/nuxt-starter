<script setup lang="ts">
const { size = 'normal' } = defineProps<{ size?: 'normal' | 'small' }>()
</script>

<template>
  <header>
    <div class="mx-auto flex items-center justify-between py-4 relative z-40 px-4 md:px-6" :class="size === 'small' ? 'max-w-5xl' : 'max-w-7xl'">
      <Logo />
      <ToolBar />
    </div>
  </header>
</template>

<style scoped>

</style>
