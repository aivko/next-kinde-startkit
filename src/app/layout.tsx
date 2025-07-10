"use client";
import * as React from 'react';

import './globals.css';
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <KindeProvider>
      <html lang="en">
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </KindeProvider>
  );
}
