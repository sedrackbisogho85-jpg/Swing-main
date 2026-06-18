import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useDashboardStore } from '../../store/dashboardStore'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Users, Briefcase, Building, UserCheck, Plus } from 'lucide-react'

function AdminDashboard() {
  const { user } = useAuthStore()
  const { fetchAdminData, loading, trainees, organizations } = useDashboardStore()
  const [activeTab, setActiveTab] = useState('trainees')
  const [showAddOrg, setShowAddOrg] = useState(false)
  const [newOrg, setNewOrg] = useState({ name: '', location: '', jobs: 0 })

  useEffect(() => {
    fetchAdminData()
  }, [])

  const sidebarItems = [
    { path: '#trainees', label: 'All Trainees', icon: <Users size={20} /> },
    { path: '#trainers', label: 'Trainers', icon: <UserCheck size={20} /> },
    { path: '#organizations', label: 'Organizations', icon: <Building size={20} /> },
    { path: '#jobs', label: 'Jobs', icon: <Briefcase size={20} /> }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="flex">
        <Sidebar items={sidebarItems} />
        
        <main className="ml-64 flex-1 p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Trainees</p>
                    <p className="text-3xl font-bold text-swing-primary">42</p>
                  </div>
                  <div className="w-12 h-12 bg-swing-light rounded-lg flex items-center justify-center">
                    <Users size={24} className="text-swing-primary" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Assigned</p>
                    <p className="text-3xl font-bold text-blue-600">28</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserCheck size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Organizations</p>
                    <p className="text-3xl font-bold text-purple-600">8</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building size={24} className="text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Available Jobs</p>
                    <p className="text-3xl font-bold text-green-600">15</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Briefcase size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            <section className="card">
              <h2 className="text-2xl font-bold text-swing-dark mb-6">Recently Registered Trainees</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-swing-light">
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Name</th>
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Email</th>
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Phone</th>
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Status</th>
                      <th className="text-left py-3 px-4 font-bold text-swing-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((trainee) => (
                      <tr key={trainee} className="border-b border-gray-200 hover:bg-swing-light transition">
                        <td className="py-3 px-4">Trainee {trainee}</td>
                        <td className="py-3 px-4">trainee{trainee}@email.com</td>
                        <td className="py-3 px-4">+1234567890</td>
                        <td className="py-3 px-4">
                          <span className="badge badge-pending">Pending</span>
                        </td>
                        <td className="py-3 px-4 space-x-2">
                          <button className="btn-primary py-1 px-3 text-sm">Assign</button>
                          <button className="btn-danger py-1 px-3 text-sm">Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card">
              <h2 className="text-2xl font-bold text-swing-dark mb-6">Rejected Trainees</h2>
              
              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <div key={item} className="p-4 border border-red-200 bg-red-50 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-swing-dark">Trainee {item}</p>
                        <p className="text-sm text-gray-600 mt-1">Reason: Does not meet prerequisites</p>
                      </div>
                      <span className="badge badge-danger">Rejected</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-swing-dark">Partner Organizations</h2>
                <button
                  onClick={() => setShowAddOrg(!showAddOrg)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Add Organization</span>
                </button>
              </div>

              {showAddOrg && (
                <div className="mb-6 p-4 border border-swing-accent rounded bg-swing-light">
                  <h3 className="font-bold text-swing-dark mb-4">Add New Organization</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Organization Name"
                      value={newOrg.name}
                      onChange={(e) => setNewOrg({...newOrg, name: e.target.value})}
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newOrg.location}
                      onChange={(e) => setNewOrg({...newOrg, location: e.target.value})}
                      className="input-field"
                    />
                    <input
                      type="number"
                      placeholder="Number of Jobs"
                      value={newOrg.jobs}
                      onChange={(e) => setNewOrg({...newOrg, jobs: e.target.value})}
                      className="input-field"
                    />
                    <div className="flex space-x-3">
                      <button className="btn-primary">Save Organization</button>
                      <button
                        onClick={() => setShowAddOrg(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Tech Solutions Inc.', location: 'New York', jobs: 5 },
                  { name: 'Digital Agency Co.', location: 'San Francisco', jobs: 3 },
                  { name: 'Innovation Labs', location: 'Austin', jobs: 4 },
                  { name: 'Future Systems', location: 'Seattle', jobs: 2 }
                ].map((org, idx) => (
                  <div key={idx} className="p-4 border border-swing-light rounded hover:border-swing-primary hover:shadow-md transition">
                    <h4 className="font-bold text-swing-dark">{org.name}</h4>
                    <p className="text-sm text-gray-600">{org.location}</p>
                    <p className="text-sm text-gray-600 mt-1">{org.jobs} Open Jobs</p>
                    <div className="flex space-x-2 mt-4">
                      <button className="btn-primary py-1 px-3 text-sm">Edit</button>
                      <button className="btn-danger py-1 px-3 text-sm">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <h2 className="text-2xl font-bold text-swing-dark mb-6">Certification Status</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-gray-600 text-sm mb-2">Certified Trainees</p>
                  <p className="text-4xl font-bold text-green-600">18</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-gray-600 text-sm mb-2">Still in Training</p>
                  <p className="text-4xl font-bold text-yellow-600">24</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
