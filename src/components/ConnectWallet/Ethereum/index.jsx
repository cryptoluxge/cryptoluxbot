import { useWeb3React } from '@web3-react/core'
import SettingsButton from 'components/SettingsButton'
import { useToast } from 'hooks/useToast'
import { useEffect, useRef } from 'react'
import ConnectButton from './ConnectButton'
import DisconnectButton from './DisconnectButton'
import WrongNetwork from './WrongNetwork'
import { injected } from './connectors'

export default function Modal() {
  const mountedRef = useRef(true)
  const { active, activate, chainId } = useWeb3React()
  const toast = useToast()
  const provider = window.ethereum
  const isConnected = localStorage.getItem('isEVMWalletConnected')

  const connectEvmWalletOnPageLoad = async () => {
    if (localStorage?.getItem('isEVMWalletConnected') === 'true') {
      try {
        if (typeof provider !== 'undefined') {
          await activate(injected)
          localStorage.setItem('isEVMWalletConnected', true)
        } else {
          toast('error', 'საფულის დასაკავშირებლად საჭიროა Metamask!')
        }
      } catch (ex) {
        toast('error', 'დაფიქსირდა შეცდომა!', ex)
      }
    }
  }

  useEffect(() => {
    connectEvmWalletOnPageLoad()

    return () => {
      mountedRef.current = false
    }
    // eslint-disable-next-line
  }, [active])

  return (
    <div className='p-3 flex items-center gap-2'>
      {active && isConnected === 'true' ? (
        <div>
          <DisconnectButton /> : <WrongNetwork changeTo='BSC' text='არასწორი ქსელი' />
        </div>
      ) : (
        <ConnectButton />
      )}
      <SettingsButton />
    </div>
  )
}
