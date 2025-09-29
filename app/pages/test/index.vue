<script setup lang="ts">
const { oFetch } = useOFetch()
const showModal = ref(false)
const { confirm } = useModal()
async function showConfirm() {
  await confirm({
    title: '提示',
    content: '确定要删除吗？'
  })
  console.log('confirm')
}
function show() {
  oFetch('/api/home')
}
function zodShow() {
  oFetch('/api/zod')
}
</script>

<template>
  <Header size="small" />
  <button @click="showModal = true">打开</button>
  <Modal v-model="showModal" modal-class="w-72 p-6 rounded-2xl bg-front shadow-xl">
    <template #header>Header</template>
    <div>test</div>
    <template #footer>footer</template>
  </Modal>
  <button @click="showConfirm">confirm</button>
  <button @click="show">show</button>
  <button @click="zodShow">zodShow</button>
  <div class="test">text</div>
</template>

<style scoped>
.test{
  @apply color-action;
}
</style>
