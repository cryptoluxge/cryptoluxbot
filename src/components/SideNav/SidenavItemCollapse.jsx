import { Transition } from '@headlessui/react'
import Avatar from 'components/Avatar'
import Typography from 'components/Typography'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const SidenavItemCollapse = ({ icon, name, path, pathname, collapse }) => {
  const [collapsed, setIsCollapsed] = useState(false)
  const [nestedCollapsed, setIsNestedCollapsed] = useState(false)
  const collapseName = pathname.split('/').slice(1)[0]
  const active = path === `/${collapseName}`
  const nestedActive = path === pathname
  const renderCollapse = collapse.map(({ name, key, path, collapse, type }, index) => {
    let returnValue
    if (type === 'collapsible') {
      returnValue = (
        <div key={index}>
          <div className={`flex items-center justify-between cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover  w-full h-[40px] px-2 rounded-lg`} onClick={() => setIsNestedCollapsed(!nestedCollapsed)}>
            <div className='flex items-center space-x-2'>
              <h1 className={`${nestedActive ? 'text-lightText dark:text-darkText ' : 'text-lightText dark:text-darkText '} duration-150 text-sm `}>{name}</h1>
            </div>
            {nestedCollapsed ? <IoIosArrowUp className='text-primary ' /> : <IoIosArrowDown className='text-primary ' />}
          </div>
          <Transition
            show={nestedCollapsed}
            enter='transition ease-out duration-150'
            enterFrom='opacity-0 -translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-1'>
            <div>
              <div className='px-2'>
                {collapse.map((x) => (
                  <NavLink key={x.key} exact='true' to={x.path}>
                    <div className='duration-150 hover:bg-lightHover dark:hover:bg-darkHover  rounded-lg p-1 cursor-pointer'>
                      <Typography className={`text-sm ${x.path === pathname ? ' bg-lightHover dark:bg-darkHover  p-2 rounded-lg' : ''}`}>{x.name}</Typography>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </Transition>
        </div>
      )
    } else {
      returnValue = (
        <NavLink key={index + 1} exact='true' to={path}>
          <div className='duration-150 hover:bg-lightHover dark:hover:bg-darkHover  rounded-lg p-2 cursor-pointer'>
            <Typography className={`text-sm ${path === pathname ? ' bg-lightHover dark:bg-darkHover  p-2 rounded-lg' : ''}`}>{name}</Typography>
          </div>
        </NavLink>
      )
    }
    return returnValue
  })

  return (
    <div className='py-1'>
      <div
        className={`${active ? 'bg-lightHover dark:bg-darkHover drop-shadow-sm' : ''} flex items-center justify-between cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover  w-full h-[50px] px-2 rounded-lg`}
        onClick={() => setIsCollapsed(!collapsed)}>
        <div className='flex items-center space-x-2'>
          <div className={`w-[28px] h-[28px] ${active ? 'bg-primary' : 'bg-zinc-500 dark:bg-darkBorder'} duration-150 rounded-md flex items-center justify-center shadow`}>
            {typeof icon === 'object' ? icon : <Avatar src={icon} alt={name} className={`${name === 'Bitcoin' || name === 'EVM' ? 'w-2.5' : 'w-4'}`} />}
          </div>
          <h1 className={`${active ? 'text-lightText dark:text-darkText ' : 'text-lightText dark:text-darkText '} duration-150 text-sm `}>{name}</h1>
        </div>
        {collapsed ? <IoIosArrowUp className='text-primary ' /> : <IoIosArrowDown className='text-primary ' />}
      </div>
      <Transition
        show={collapsed}
        enter='transition ease-out duration-150'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 -translate-y-1'>
        <div>
          <div className='mt-2'>{renderCollapse}</div>
        </div>
      </Transition>
    </div>
  )
}

export default SidenavItemCollapse
