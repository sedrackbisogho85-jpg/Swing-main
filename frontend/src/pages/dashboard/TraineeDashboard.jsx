import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useDashboardStore } from '../../store/dashboardStore'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { User, BookOpen, Briefcase, Trophy, Plus, Edit } from 'lucide-react'

function TraineeDashboard() {
  const { user } = useAuthStore()
  const { fetchTraineeData, updateTraineeProfile, loading } = useDashboardStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [skills, setSkills] = useState({
    existing: '',
    interests: ''
  })

  useEffect(() => {
    if (user?.id) {
      fetchTraineeData(user.id)
    }
  }, [user])

  const sidebarItems = [
    { path: '#profile', label: 'Profile', icon: <User size={20} /> },
    { path: '#skills', label: 'My Skills', icon: <BookOpen size={20} /> },
    { path: '#training', label: 'Training', icon: <Trophy size={20} /> },
    { path: '#jobs', label: 'Job Recommendations', icon: <Briefcase size={20} /> }
  ]

  const handleSaveProfile = async () => {
    try {
      await updateTraineeProfile(user.id, {
        ...profile,
        skills
      })
      setEditMode(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="flex">
        <Sidebar items={sidebarItems} />
        
        <main className="ml-64 flex-1 p-8">
          <div className="space-y-8">
            <section className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-swing-dark">My Profile</h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Edit size={18} />
                  <span>{editMode ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="w-32 h-32 bg-swing-light rounded-lg flex items-center justify-center">
                    <User size={64} className="text-swing-primary" />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-swing-dark mb-1">
                      Full Name
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="input-field"
                      />
                    ) : (
                      <p className="text-lg text-gray-700">{user?.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swing-dark mb-1">
                      Email
                    </label>
                    <p className="text-lg text-gray-700">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swing-dark mb-1">
                      Phone
                    </label>
                    {editMode ? (
                      <input
                        type="tel"
                        defaultValue={user?.phone}
                        className="input-field"
                      />
                    ) : (
                      <p className="text-lg text-gray-700">{user?.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="card">
              <h3 className="text-xl font-bold text-swing-dark mb-6">My Skills</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-swing-dark mb-3">
                    Do you have existing skills?
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="hasSkills" className="w-4 h-4" />
                      <span className="text-gray-700">Yes, I have skills to list</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="hasSkills" className="w-4 h-4" />
                      <span className="text-gray-700">No, I'm starting fresh</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-swing-dark mb-2">
                    Existing Skills (if any)
                  </label>
                  <textarea
                    value={skills.existing}
                    onChange={(e) => setSkills({...skills, existing: e.target.value})}
                    disabled={!editMode}
                    placeholder="List your skills separated by commas..."
                    className="input-field h-24 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-swing-dark mb-2">
                    Skills You Want to Learn
                  </label>
                  <textarea
                    value={skills.interests}
                    onChange={(e) => setSkills({...skills, interests: e.target.value})}
                    disabled={!editMode}
                    placeholder="List skills you are interested in learning..."
                    className="input-field h-24 disabled:bg-gray-100"
                  />
                </div>

                {editMode && (
                  <button onClick={handleSaveProfile} className="btn-primary">
                    Save Skills
                  </button>
                )}
              </div>
            </section>

            <section className="card">
              <h3 className="text-xl font-bold text-swing-dark mb-6">Training Status</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-swing-light border border-swing-accent rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-swing-dark">Current Training</span>
                    <span className="badge badge-pending">In Progress</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Trainer: John Doe</p>
                  <p className="text-sm text-gray-600">Progress: 60%</p>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-swing-dark">Completed Training</span>
                    <span className="badge badge-success">Certified</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Skill: Web Development</p>
                </div>
              </div>
            </section>

            <section className="card">
              <h3 className="text-xl font-bold text-swing-dark mb-6">Recommended Jobs</h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-swing-light rounded hover:border-swing-primary hover:bg-swing-light transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-swing-dark">Frontend Developer</h4>
                      <p className="text-sm text-gray-600">Tech Solutions Inc.</p>
                      <p className="text-sm text-gray-700 mt-2">Building responsive web applications using React</p>
                    </div>
                    <span className="badge badge-success">New</span>
                  </div>
                </div>

                <div className="p-4 border border-swing-light rounded hover:border-swing-primary hover:bg-swing-light transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-swing-dark">UI/UX Designer</h4>
                      <p className="text-sm text-gray-600">Digital Agency Co.</p>
                      <p className="text-sm text-gray-700 mt-2">Creating beautiful and functional user interfaces</p>
                    </div>
                    <span className="badge badge-success">New</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TraineeDashboard
