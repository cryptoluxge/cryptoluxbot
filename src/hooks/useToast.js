import { useToastDispatchContext } from '../context/ToastContext'

export function useToast() {
  const dispatch = useToastDispatchContext()

  function toast(type, title, message, txHash, chain, networkId) {
    const id = Math.random().toString(36).substr(2, 9)
    dispatch({ type: 'ADD_TOAST', toast: { type, title, message, txHash, chain, networkId, id } })

    setTimeout(() => {
      dispatch({ type: 'DELETE_TOAST', id: id })
    }, 6000)
  }

  return toast
}
