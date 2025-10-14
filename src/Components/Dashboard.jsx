import Sidebar from './Sidebar'
import useAdminStore from '../Store/AdminStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const { users, leads, sos, infos } = useAdminStore();
  const { userLists, leadLists, sosLists, infoLists } = useAdminStore();
  const { basicInfo } = useAdminStore();
  const { admin } = useAdminStore();

  useEffect(() => {
    basicInfo();
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-100 font-mulish">
      <Sidebar />

      <section className="flex-1 px-6 py-8">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Track, manage, and convert your leads with ease
          </h1>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { id: 1, name: "Total User", count: users, icon: "👤" },
            { id: 2, name: "Total Lead", count: leads, icon: "📁" },
            { id: 3, name: "New SOS", count: sos, icon: "🚨" },
            { id: 4, name: "Total External", count: infos, icon: "📂" },
          ].map((item) => (
            <div
              key={item.id}
              className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center justify-center text-center"
            >
              {/* Subtle background gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />

              {/* Icon Section */}
              <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border border-gray-200">
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* Name */}
              <p className="text-gray-600 font-semibold text-lg tracking-wide">
                {item.name}
              </p>

              {/* Count */}
              <p className="text-gray-900 font-extrabold text-4xl mt-1">{item.count}</p>
            </div>
          ))}
        </div>


        {/* Info Section */}
        <div className="flex flex-wrap gap-6 px-0 md:px-10">
          {/* Admin Profile */}
          <div className="flex-1 min-w-[300px] bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-1">Welcome Back</h2>
            <p className="text-gray-500 font-medium mb-4">Profile Info</p>

            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              <img
                src={admin?.image}
                alt={admin?.name}
                className="w-36 h-36 object-cover border border-gray-300 rounded-lg"
              />
              <div>
                <p className="font-semibold text-2xl">{admin?.name}</p>
                <p className="text-gray-600 font-medium mt-3">{admin?.email}</p>
                <p className="text-gray-600 font-medium mt-1">{admin?.phone}</p>
              </div>
            </div>
          </div>

          {/* SOS Table */}
          <div className="flex-1 min-w-[400px] bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-600 font-semibold text-lg">Recent SOS</h3>
              <button
                className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
                onClick={() => navigate('/sos')}
              >
                View All
              </button>
            </div>
            <table className="w-full text-left text-sm border-t">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                <tr>
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Message</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {sosLists?.length ? (
                  sosLists.map((sos) => (
                    <tr key={sos._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">{sos?.user?.name}</td>
                      <td className="py-3 px-2">{sos.message}</td>
                      <td className="py-3 px-2">{sos.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-3 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* External Info */}
          <div className="flex-1 min-w-[400px] bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-600 font-semibold text-lg">Recent External Info</h3>
              <button
                className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
                onClick={() => navigate('/infoList')}
              >
                View All
              </button>
            </div>
            <table className="w-full text-left text-sm border-t">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                <tr>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">State</th>
                  <th className="py-3 px-2">District</th>
                  <th className="py-3 px-2">Police Station</th>
                </tr>
              </thead>
              <tbody>
                {infoLists?.length ? (
                  infoLists.map((info) => (
                    <tr key={info._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">{info.type}</td>
                      <td className="py-3 px-2">{info.name}</td>
                      <td className="py-3 px-2">{info.state}</td>
                      <td className="py-3 px-2">{info.district}</td>
                      <td className="py-3 px-2">{info.policeStation}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-3 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lower Tables */}
        <div className="flex flex-col md:flex-row gap-8 px-0 md:px-10 mt-12">
          {/* Leads Section */}
          <section className="bg-white p-6 w-full shadow-md rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-600 font-semibold text-lg">All Leads</p>
              <button
                className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
                onClick={() => navigate("/users")}
              >
                View All
              </button>
            </div>
            <table className="w-full text-left text-sm border-t">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                <tr>
                  <th className="px-3 py-2">Image</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {leadLists?.length ? (
                  leadLists.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <img
                          src={user?.image}
                          alt={user?.name}
                          className="w-10 h-10 object-cover border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-3 py-2">{user?.name}</td>
                      <td className="px-3 py-2">{user?.email}</td>
                      <td className="px-3 py-2">{user?.phone}</td>
                      <td className="px-3 py-2">
                        {new Date(user?.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-3 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          {/* Users Section */}
          <section className="bg-white p-6 w-full shadow-md rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-600 font-semibold text-lg">All Users</p>
              <button
                className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
                onClick={() => navigate("/leads")}
              >
                View All
              </button>
            </div>
            <table className="w-full text-left text-sm border-t">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                <tr>
                  <th className="px-3 py-2">Image</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {userLists?.length ? (
                  userLists.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <img
                          src={user?.image}
                          alt=""
                          className="w-10 h-10 object-cover border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-3 py-2">{user?.name}</td>
                      <td className="px-3 py-2">{user?.email}</td>
                      <td className="px-3 py-2">{user?.phone}</td>
                      <td className="px-3 py-2">
                        {new Date(user?.updatedAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-3 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
