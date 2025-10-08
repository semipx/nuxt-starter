<template>
  <NuxtPage />
  <Modal ref="modalRef" :z-index="10001" />
</template>

<script setup lang="ts">
import type { ModalOpen } from '~/composables/useModal'

const modalRef = useTemplateRef('modalRef') as Ref<ModalOpen>
useModal(modalRef)
const { t, locale } = useI18n()
const route = useRoute()
const i18nHead = useLocaleHead()
const url = useRequestURL()
// const origin = 'https://' + url.host
const origin = url.origin
const coverImg = locale.value === 'zh-Hans' ? `${origin}/cover.jpg` : `${origin}/cover.jpg`
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang
  },
  titleTemplate: (titleChunk) => {
    return (route.name as string).startsWith('index') && !route.query.q ? titleChunk || t('seoTitle') : `${titleChunk} - ${t('siteName')}`
  },
  link: [
    ...(i18nHead.value.link || []),
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-96x96.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'shortcut icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    }
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0' },
    ...(i18nHead.value?.meta || []),
    { name: 'description', content: t('seoDescription') },
    { property: 'og:site_name', content: t('siteName') },
    { property: 'og:url', content: `${origin}/` },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: t('seoTitle') },
    { property: 'og:description', content: t('seoDescription') },
    { property: 'og:image', content: coverImg },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:domain', content: url.host },
    { name: 'twitter:url', content: `${origin}/` },
    { name: 'twitter:title', content: t('seoTitle') },
    { name: 'twitter:description', content: t('seoDescription') },
    { name: 'twitter:image', content: coverImg }
  ]
})
</script>
