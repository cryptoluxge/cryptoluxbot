import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineSetting } from 'react-icons/ai'
import Typography from 'components/Typography'
import Borderline from 'components/Borderline'

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isTestnet, setIsTestnet] = useState(false)

  const toggleDarkMode = () => {
    const newMode = isDarkMode ? 'light' : 'dark'
    localStorage.setItem('darkMode', newMode)
    setIsDarkMode(!isDarkMode)
    if (newMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTestnetNetworks = () => {
    const showTestnetNetworks = localStorage.getItem('showTestnetNetworks') === 'true'
    const newShowTestnetNetworks = !showTestnetNetworks
    localStorage.setItem('showTestnetNetworks', newShowTestnetNetworks)
    setIsTestnet(newShowTestnetNetworks)
  }

  useEffect(() => {
    const darkModeSet = localStorage.getItem('darkMode')
    if (darkModeSet === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    }

    const testnetMode = localStorage.getItem('showTestnetNetworks')
    if (testnetMode === 'true') {
      setIsTestnet(true)
    }
  }, [])

  return (
    <div>
      <Menu as='div' className='inline-block text-left'>
        <Menu.Button className='p-2 w-full rounded-md duration-150 bg-lightCard dark:bg-darkCard font-medium text-white border-[1px] border-lightBorder dark:border-darkBorder'>
          <div>
            <AiOutlineSetting className='duration-150 text-lightText dark:text-darkText text-2xl' />
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items className='origin-top-center absolute center-1 mt-2 w-auto rounded-md shadow-lg z-50 duration-150 bg-lightModal dark:bg-darkModal focus:outline-none border-[1px] border-lightBorder dark:border-darkBorder right-3'>
            <div>
              <Typography className='text-sm p-2' color='text-gray-500'>
                პარამეტრები
              </Typography>
              <Borderline />
              <div className='p-2'>
                <div className='flex items-center justify-between'>
                  <Typography className='text-sm'>Dark Mode</Typography>
                  <div className='flex items-center'>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input onChange={toggleDarkMode} type='checkbox' value='' className='sr-only peer' checked={isDarkMode} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                </div>
              </div>
              <Borderline />
              <div className='p-2'>
                <div className='flex items-center justify-between gap-5'>
                  <Typography className='text-sm'>Testnet ქსელები</Typography>
                  <div className='flex items-center'>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input onChange={toggleTestnetNetworks} type='checkbox' value='' className='sr-only peer' checked={isTestnet} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Index
