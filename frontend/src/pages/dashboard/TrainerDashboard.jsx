import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useDashboardStore } from '../../store/dashboardStore'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Users, CheckCircle, AlertCircle, User } from 'lucide-react'

function TrainerDashboard() {
  const { user } = useAuthStore()
  const { fetchTrainerData, loading } = useDashboardStore()
  const [activeTab, setActiveTab] = useState('assigned')

  useEffect(() => {
    if (user?.id) {
      fetchTrainerData(user.id)
    }
  }, [user])

  const sidebarItems = [
    { path: '#assigned', label: 'New Trainees', icon: <Users size={20} /> },
    { path: '#certified', label: 'Certified Trainees', icon: <CheckCircle size={20} /> },
    { path: '#failed', label: 'Return Trainees', icon: <AlertCircle size={20} /> }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="flex">
        <Sidebar items={sidebarItems} />
        
        <main className="ml-64 flex-1 p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">New Trainees</p>
                    <p className="text-3xl font-bold text-swing-primary">5</p>
                  </div>
                  <div className="w-12 h-12 bg-swing-light rounded-lg flex items-center justify-center">
                    <Users size={24} className="text-swing-primary" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Certified</p>
                    <p className="text-3xl font-bold text-green-600">12</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Need Retrain</p>
                    <p className="text-3xl font-bold text-yellow-600">3</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertCircle size={24} className="text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            <section className="card">
              <h2 className="text-2xl font-bold text-swing-dark mb-6">Trainees Assigned to Me</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-swing-light">
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Name</th>
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Email</th>
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Skill</th>
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Progress</th>
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((trainee) => (
                      <tr key={trainee} className="border-b border-gray-200 hover:bg-swing-light transition">
                        <td className="py-3 px-4">Trainee {trainee}</td>
                        <td className="py-3 px-4">trainee{trainee}@email.com</td>
                        <td className="py-3 px-4">React Development</td>
                        <td className="py-3 px-4">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-swing-primary h-2 rounded-full" style={{width: '40%'}}></div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button className="btn-primary py-1 px-3 text-sm">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card">
              <h2 className="text-2xl font-bold text-swing-dark mb-6">Certified Trainees</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((trainee) => (
                  <div key={trainee} className="p-4 border border-green-200 bg-green-50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                        <CheckCircle size={20} className="text-green-700" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-swing-dark">Trainee {trainee}</p>
                        <p className="text-sm text-gray-600">Web Development</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <h2 className="text-2xl font-bold text-swing-dark mb-6">Trainees Returning for Retraining</h2>
              
              <div className="space-y-3">
                {[1, 2, 3].map((trainee) => (
                  <div key={trainee} className="p-4 border border-yellow-200 bg-yellow-50 rounded">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                          <AlertCircle size={20} className="text-yellow-700" />
                        </div>
                        <div>
                          <p className="font-bold text-swing-dark">Trainee {trainee}</p>
                          <p className="text-sm text-gray-600">Mobile Development - Needs Retraining</p>
                        </div>
                      </div>
                      <button className="btn-primary py-1 px-3 text-sm">
                        Restart Training
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TrainerDashboard
