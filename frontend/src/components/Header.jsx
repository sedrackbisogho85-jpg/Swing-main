import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogOut, User, Bell } from 'lucide-react'

function Header() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-swing-primary">Swing</h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer hover:bg-swing-light p-2 rounded">
              <Bell size={24} className="text-swing-primary" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>

            <div className="flex items-center space-x-2 px-4 py-2 bg-swing-light rounded">
              <User size={20} className="text-swing-primary" />
              <span className="text-sm font-medium text-swing-dark">{user?.name || 'User'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 btn-primary"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
