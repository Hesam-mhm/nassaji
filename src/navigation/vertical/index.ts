// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Monitoring',
      path: '/home',
      icon: 'eos-icons:monitoring'
    }
  ]
}

export default navigation
