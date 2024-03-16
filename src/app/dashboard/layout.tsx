import * as React from "react";
import './../globals.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { MainNav } from "@/components/dashboard/layout/main-nav";
import { SideNav } from '@/components/dashboard/layout/side-nav';

// export const metadata = {
//   title: "Kinde Auth",
//   description: "Kinde with NextJS App Router",
// };

export default async function RootLayout({
 children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const permissions = await getPermission('x');
  console.log(permissions);
  const user = await getUser();
  console.log(user);

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <MainNav user={user}/>
          <main>
            {children}
            {/*<Container maxWidth="xl" sx={{ py: '64px' }}>*/}
            {/*  <LoginLink className="btn btn-ghost sign-in-btn">*/}
            {/*    Sign in*/}
            {/*  </LoginLink>*/}
            {/*  <RegisterLink className="btn btn-green">Sign up</RegisterLink>*/}
            {/*</Container>*/}
          </main>
        </Box>
      </Box>
    {/*  <nav className="nav container">*/}
    {/*    <h1 className="text-display-3">Officine Futuro</h1>*/}
    {/*    <div>*/}
    {/*      {!(await isAuthenticated()) ? (*/}
    {/*        <>*/}
    {/*          <LoginLink className="btn btn-ghost sign-in-btn">*/}
    {/*            Sign in*/}
    {/*          </LoginLink>*/}
    {/*          <RegisterLink className="btn btn-green">Sign up</RegisterLink>*/}
    {/*        </>*/}
    {/*      ) : (*/}
    {/*        <MainNav user={user} />*/}
    {/*        // <div className="profile-blob">*/}
    {/*        //   {user?.picture ? (*/}
    {/*        //     <img*/}
    {/*        //       className="avatar"*/}
    {/*        //       src={user?.picture}*/}
    {/*        //       alt="user profile avatar"*/}
    {/*        //       referrerPolicy="no-referrer"*/}
    {/*        //     />*/}
    {/*        // //   ) : (*/}
    {/*        // //     <div className="avatar">*/}
    {/*        //       /!*{user?.given_name?.[0]}*!/*/}
    {/*        //       /!*{user?.family_name?.[0]}*!/*/}
    {/*        // //     </div>*/}
    {/*        // //   )}*/}
    {/*        //   <div>*/}
    {/*        //     <p className="text-heading-2">*/}
    {/*        //       {user?.given_name} {user?.family_name}*/}
    {/*        //     </p>*/}
    {/*        //*/}
    {/*        //     <LogoutLink className="text-subtle">Log out</LogoutLink>*/}
    {/*        //   </div>*/}
    {/*        // </div>*/}
    {/*      )}*/}
    {/*    </div>*/}
    {/*  </nav>*/}
    {/*/!*<SideNav />*!/*/}
    {/*<main>{children}</main>*/}
  </>
  );
}
