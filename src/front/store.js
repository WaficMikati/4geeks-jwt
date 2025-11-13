export const initialStore = () => {
  return {
    message: null,
    token:
      sessionStorage.getItem('token') || localStorage.getItem('token') || null,
    language: localStorage.getItem('language') || 'EN',
    translations: null
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_token':
      if (action.payload) {
        sessionStorage.setItem('token', action.payload)
      }
      return {
        ...store,
        token: action.payload
      }

    case 'clear_token':
      sessionStorage.removeItem('token')
      localStorage.removeItem('token')
      return {
        ...store,
        token: null
      }

    case 'set_hello':
      return {
        ...store,
        message: action.payload
      }

    case 'set_language':
      return {
        ...store,
        language: action.payload
      }

    case 'set_translations':
      return {
        ...store,
        translations: action.payload
      }

    default:
      throw Error('Unknown action.')
  }
}
