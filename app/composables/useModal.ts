export interface ModalOptions {
  title?: string
  content?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  showCancelButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  maskClosable?: boolean
  modalClass?: string
  mobileWidth?: number
}
interface ModalProvider {
  confirm: (options: ModalOptions) => Promise<void>
  modal: (options: ModalOptions) => Promise<void>
  toast: (content: string, type?: 'info' | 'success' | 'warning' | 'error', duration?: number) => Promise<void>
  errorHandle: (error: Error) => void
}
export interface ModalOpen {
  open: (opts?: ModalOptions) => Promise<void>
  close: () => void
}
export default function useModal(modalRef?: Ref<ModalOpen>): ModalProvider {
  const { t } = useI18n()
  if (modalRef) {
    const provider: ModalProvider = {
      confirm(options) {
        const defaultOpts = {
          type: 'warning',
          showCancelButton: true,
          cancelButtonText: t('modalCancel'),
          confirmButtonText: t('modalConfirm'),
          maskClosable: false
        }
        return modalRef.value.open(Object.assign({}, defaultOpts, options))
      },
      modal(options: ModalOptions) {
        return modalRef.value.open(options)
      },
      toast(content, type = 'info', duration = 2500) {
        const options = {
          type,
          content,
          toast: true
        }
        modalRef.value.open(options)
        return new Promise((resolve) => {
          setTimeout(() => {
            modalRef.value.close()
            resolve()
          }, duration)
        })
      },
      errorHandle(error) {
        const options = {
          type: 'error',
          title: '',
          content: error.message,
          showCancelButton: false,
          cancelButtonText: '',
          confirmButtonText: t('modalOK'),
          maskClosable: true
        }
        modalRef.value.open(options as ModalOptions)
      }
    }
    provide('modalProvider', provider)
    return provider
  }
  else {
    return inject<ModalProvider>('modalProvider')!
  }
}
