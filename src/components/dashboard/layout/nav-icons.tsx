const { XSquare: XSquareIcon } = require('@phosphor-icons/react/dist/ssr/XSquare');
const { PlugsConnected: PlugsConnectedIcon } = require('@phosphor-icons/react/dist/ssr/PlugsConnected');
const { GearSix: GearSixIcon } = require('@phosphor-icons/react/dist/ssr/GearSix');
const { ChartPie: ChartPieIcon } = require('@phosphor-icons/react/dist/ssr/ChartPie');
const { User: UserIcon } = require('@phosphor-icons/react/dist/ssr/User');
const { Users: UsersIcon } = require('@phosphor-icons/react/dist/ssr/Users');

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquareIcon,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, any>;
