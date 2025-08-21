import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
  showNav?: boolean
}

const Layout = ({ children, showNav = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showNav && <Navigation />}
      <main>{children}</main>
    </div>
  )
}

export default Layout
