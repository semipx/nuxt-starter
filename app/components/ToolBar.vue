<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
// const localePath = useLocalePath()
const currentLocale = computed(() => {
  return locales.value.find((i: any) => i.code === locale.value)
})
const rtl = computed(() => ['ar', 'he'].includes(locale.value))
const showSider = ref(false)
function closeSider() {
  showSider.value = false
}
</script>

<template>
  <div class="flex items-center h-9 relative">
    <DropDown
      class="hidden md:flex items-center relative cursor-default shrink-0"
      :top="38"
      :left="0"
    >
      <template #default="{ active }">
        <button class="h-9 center pl-2 pr-1 rounded-lg color-action md:hover:bg-gray-200 md:dark:hover:bg-gray-700" :class="{ 'bg-gray-200 dark:bg-gray-700': active }">
          <i class="icon-[hugeicons--translation] text-xl shrink-0" :class="rtl ? 'ml-1' : 'mr-1'" role="img" aria-hidden="true" />
          <span class="shrink-0 select-none text-sm">{{ currentLocale?.name }}</span>
          <i
            class="icon-[hugeicons--arrow-down-01] transition-all shrink-0"
            role="img"
            :class="{ 'rotate-180': active }"
            aria-hidden="true"
          />
        </button>
      </template>
      <template #content="{ close }">
        <div class="card langs w-[264px] p-2 rounded-lg flex flex-wrap text-sm grid grid-cols-2">
          <NuxtLink
            v-for="l in locales"
            :key="l.code"
            :to="switchLocalePath(l.code)"
            replace
            :class="l.code === locale ? 'dis' : ''"
            @click="close()"
          >
            {{ l.name }}
          </NuxtLink>
        </div>
      </template>
    </DropDown>
    <ThemeToggle class="ml-2 hidden md:flex" />
    <a href="https://github.com/semipx/nuxt-starter" target="_blank" aria-label="Folk on GitHub" class="hidden md:flex text-2xl w-9 h-9 rounded-lg center ml-2 md:hover:bg-gray-200 md:dark:hover:bg-gray-700">
      <i class="icon-[mdi--github]" role="img" aria-hidden="true" />
    </a>
    <button
      class="h-9 center ml-2 w-9 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-sm border border-main color-action center flex md:hidden"
      @click="showSider = true"
    >
      <i class="icon-[hugeicons--menu-01] text-lg" role="img" aria-hidden="true" />
    </button>
    <ClientOnly>
      <transition name="fade" :duration="150">
        <div v-if="showSider" class="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-black/80 backdrop-blur-sm z-30" @click="closeSider" />
      </transition>
      <div class="fixed right-0 top-0 bg-body w-56 h-[100vh] z-50 p-2" :class="showSider ? 'block slide-right' : 'hidden'">
        <DropDown
          class="flex items-center relative cursor-default shrink-0 border-b border-main"
          :top="38"
          :left="0"
        >
          <template #default="{ active }">
            <button class="h-11 w-full flex items-center justify-between px-4 rounded-lg color-action hover:bg-gray-200 dark:hover:bg-gray-700" :class="{ 'bg-gray-200 dark:bg-gray-700': active }">
              <span class="center">
                <i class="icon-[hugeicons--translation] text-xl shrink-0" :class="rtl ? 'ml-1' : 'mr-1'" role="img" aria-hidden="true" />
                <span class="shrink-0 select-none text-sm">{{ currentLocale?.name }}</span>
              </span>
              <i
                class="icon-[hugeicons--arrow-down-01] transition-all shrink-0"
                role="img"
                :class="{ 'rotate-180': active }"
                aria-hidden="true"
              />
            </button>
          </template>
          <template #content="{ close }">
            <div class="langs w-full text-base grid grid-cols-2">
              <NuxtLink
                v-for="l in locales"
                :key="l.code"
                :to="switchLocalePath(l.code)"
                replace
                :class="l.code === locale ? 'dis' : ''"
                @click="close()"
              >
                {{ l.name }}
              </NuxtLink>
            </div>
          </template>
        </DropDown>
        <ThemeToggle class="mt-2 ml-4 bg-gray-200 dark:bg-gray-700" />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.langs a{
  @apply h-10 sm:h-8 px-2 rounded-lg line-clamp-1 break-all leading-10 sm:leading-8 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200;
  &.dis{@apply text-gray-300 dark:text-gray-600 cursor-default hover:bg-transparent dark:hover:bg-transparent hover:text-gray-300 dark:hover:text-gray-600}
}
.slide-right {
  animation: slideLeft 0.15s ease forwards;
}

@keyframes slideLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
