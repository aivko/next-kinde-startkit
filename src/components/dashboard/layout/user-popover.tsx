import * as React from 'react';
import RouterLink from 'next/link';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
const { GearSix: GearSixIcon } = require('@phosphor-icons/react/dist/ssr/GearSix');
const { SignOut: SignOutIcon } = require('@phosphor-icons/react/dist/ssr/SignOut');
const { User: UserIcon } = require('@phosphor-icons/react/dist/ssr/User');

import { paths } from '@/paths';
// import { authClient } from '@/lib/auth/client';
// import { logger } from '@/lib/default-logger';
// import { useUser } from '@/hooks/use-user';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
  user: any;
}

export function UserPopover({ anchorEl, onClose, open, user }: UserPopoverProps): React.JSX.Element {
  // const { checkSession } = useUser();

  const router = useRouter();

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      // const { error } = await authClient.signOut();
      //
      // if (error) {
      //   logger.error('Sign out error', error);
      //   return;
      // }
      //
      // // Refresh the auth state
      // await checkSession?.();
      //
      // // UserProvider, for this case, will not refresh the router and we need to do it manually
      // router.refresh();
      // // After refresh, AuthGuard will handle the redirect
    } catch (err) {
      // logger.error('Sign out error', err);
    }
  }, []);

  // console.log(user)

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">
          {user?.given_name} {user?.family_name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={RouterLink} href={paths.dashboard.account} onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Profilo
        </MenuItem>
        <MenuItem>
          <LogoutLink>
            <ListItemIcon>
              <SignOutIcon fontSize="var(--icon-fontSize-md)" />
            </ListItemIcon>
            Uscire
          </LogoutLink>
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
