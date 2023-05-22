import DashboardIcon from './assets/images/SidebarIcons/DashboardIcon.svg'
import GamesIcon from './assets/images/SidebarIcons/GamesIcon.svg'

export const menuItem = [
  {
    type: 'noncollapsible',
    name: 'ბოტი',
    key: 'bot',
    path: '/airdrops/bot',
    icon: DashboardIcon,
  },
  {
    type: 'noncollapsible',
    path: '/games',
    key: 'games',
    name: 'თამაშები',
    icon: GamesIcon,
  },
]
