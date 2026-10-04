import { NavLink, Outlet } from 'react-router-dom'
import { FiCode, FiTag, FiInfo, FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'

const NAV_ITEMS = [
  { to: '/fragment', label: 'Fragments', icon: FiCode },
  { to: '/tag', label: 'Tags', icon: FiTag },
  { to: '/about', label: 'À propos', icon: FiInfo }
]

function Layout() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="app">
      <aside className="sidebar">
        <NavLink to="/fragment" className="brand">
          <span className="brand-logo" aria-hidden="true">
            {'{ }'}
          </span>
          <span className="brand-name">Code Wallet</span>
        </NavLink>

        <nav className="nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className="nav-link">
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          <span>{isDark ? 'Thème clair' : 'Thème sombre'}</span>
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
