import { ReactNode } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  showNav?: boolean
  showFooter?: boolean
}

export default function Layout({ children, showNav = true, showFooter = true }: LayoutProps) {
  return (
    <>
      {showNav && <Navigation />}
      <main>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  )
}
