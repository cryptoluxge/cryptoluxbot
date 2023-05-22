import Avatar from 'components/Avatar'
import { NavLink, useLocation } from 'react-router-dom'
import SidenavItemCollapse from './SidenavItemCollapse'
import Typography from 'components/Typography'

const SidenavItem = ({ menuItem }) => {
  const location = useLocation()
  const { pathname } = location
  const renderRoutes = menuItem.map(({ type, path, name, icon, key, collapse }) => {
    let returnValue
    const active = path === pathname
    if (type === 'noncollapsible') {
      returnValue = (
        <div key={key} className='mt-1'>
          <NavLink exact='true' to={path}>
            <div className={`${active ? 'bg-lightHover dark:bg-darkHover drop-shadow-sm' : ''} flex items-center space-x-2 cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover w-full h-[50px] px-2 rounded-md`}>
              <div className={`w-[28px] h-[28px] duration-150 ${active ? 'bg-primary' : 'bg-zinc-500 dark:bg-darkBorder '} rounded-md flex items-center justify-center`}>
                {typeof icon === 'object' ? icon : <Avatar src={icon} alt={name} className={`${name === 'Bitcoin' || name === 'EVM' ? 'w-3' : 'w-4'}`} />}
              </div>
              <h1 className={`${active ? 'text-lightText dark:text-darkText ' : 'text-lightText dark:text-darkText '} duration-150 text-sm`}>{name}</h1>
            </div>
          </NavLink>
        </div>
      )
    } else if (type === 'title') {
      returnValue = (
        <Typography key={key} className='text-sm px-2 py-2'>
          {name}
        </Typography>
      )
    } else if (type === 'collapsible') {
      returnValue = <SidenavItemCollapse name={name} icon={icon} key={key} path={path} pathname={pathname} collapse={collapse} />
    }
    return returnValue
  })

  return renderRoutes
}

export default SidenavItem
