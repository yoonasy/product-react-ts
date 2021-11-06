const init = async (callback?: any) => {
  try {
    // @ts-ignore
    window.document.title = import.meta.env.VITE_TITLE
    // @ts-ignore
    window.document.head.title = import.meta.env.VITE_TITLE
  } catch (e) { }

  if (!!import.meta.env.VITE_IS_MOCK) {
    await import('../../mock/product')
  }

  callback && callback()
}

export default init
