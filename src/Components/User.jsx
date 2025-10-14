import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { bulkSmsButton, filterBtnList } from '../Utils/userPage'
import { FiSearch } from "react-icons/fi";
import { Toaster } from 'react-hot-toast';
import useUserStore from '../Store/UserStore';
import { usersTable } from '../Utils/tableData';
import { FcOk, FcCancel } from "react-icons/fc";
import EditProfile from './EditProfile';
import Swal from "sweetalert2";

function User() {
  const users = useUserStore((state) => state.users);
  const user = useUserStore((state) => state.user);
  const getAllUsers = useUserStore((state) => state.getAllUsers);
  const getUserDetailsByID = useUserStore((state) => state.getUserDetailsByID);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const [search, setSearch] = useState('');
  const filteredUser = (users || []).filter((user) => (
    user?.name?.toLowerCase().includes(search.toLowerCase())
  ));
  const [edit, setEdit] = useState(false);

  const fetchData = async () => {
    await getAllUsers();
  };

  const downloadDocs = async (url) => {
    try {
      const response = await fetch(url, { method: "GET" });
      const blob = await response.blob();
      const filename = "document";
      const fileURL = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = filename || "document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  const handelDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await deleteUser(id);

      await getAllUsers();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='flex flex-row min-h-screen bg-gray-100 font-mulish'>
      <Sidebar />
      <main className="px-6 py-6 w-full">
        {edit && (
          <EditProfile id={user._id} setEdit={setEdit} edit={edit} />
        )}
        <div className='flex flex-row justify-between items-center'>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Track, manage, and convert your Users with ease
          </p>
        </div>

        <main className='flex flex-col lg:flex-row gap-8'>
          <section className='lg:w-2/5 bg-white shadow-sm rounded-xl p-5'>
            <div className='flex flex-row justify-between items-center'>
              <p>All Existing users</p>
            </div>

            <div className='flex flex-row gap-2 items-center border border-gray-300 px-4 py-2 rounded-lg mb-4 bg-gray-50 my-3'>
              <FiSearch />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search User by Name'
                className='outline-none w-full'
                type="text" />
            </div>

            <table className='w-full text-left text-sm'>
              <thead className='bg-gray-100 text-gray-700 uppercase text-xs border-b'>
                <tr>
                  {usersTable.map((t, index) => (
                    <th className='py-3 px-2' key={index}>{t}</th>
                  ))}
                </tr>
              </thead>
              {users ? (
                <tbody>
                  {filteredUser.map((user) => (
                    <tr className='hover:bg-gray-50 cursor-pointer transition' key={user?._id} onClick={() => getUserDetailsByID(user._id)}>
                      <td className='py-3 px-2'><img className='w-12 h-12 rounded-full object-cover border border-gray-200' src={user.image} alt="" /></td>
                      <td className='py-3 px-2'>{user.name}</td>
                      <td className='py-3 px-2'>{user.phone}</td>
                      <td className='py-3 px-2'>{user.email}</td>
                      <td className='py-3 px-2'>{user?.vehicle?.mode}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody className='w-full text-center py-10 text-gray-500'>
                  <td className='text-center'>No User Found</td>
                </tbody>
              )}
            </table>
          </section>
          <section className='lg:w-3/5 bg-white shadow-sm rounded-xl p-6'>
            {user ? (
              <div>

                <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                  <h3 className="text-lg font-semibold text-navy-700 mb-3">
                    Personal Details
                  </h3>
                  <div className='flex flex-row items-start justify-between'>
                    <img src={user.image} alt="" className="w-20 h-20 rounded-sm object-cover mb-3" />
                    <button
                      onClick={() => setEdit(true)}
                      className='px-4 py-2 bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 transition-all cursor-pointer font-semibold'
                    >
                      Edit Profile
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 font-medium">Full Name</p>
                      <p className="text-gray-800">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Email</p>
                      <p className="text-gray-800">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Phone</p>
                      <p className="text-gray-800 flex flex-row items-center gap-3">{user.phone} <span>{user.verify ? <FcOk /> : <FcCancel />}</span></p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Address</p>
                      <div>
                        {[
                          user.address?.street,
                          user.address?.city,
                          user.address?.state,
                          user.address?.pincode,
                        ].join(", ")}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">PAN</p>
                      <p className="text-gray-800">{user.pan?.Number}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Aadhar</p>
                      <p className="text-gray-800">{user.aadhar?.Number}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-5">
                  <h3 className="text-lg font-semibold text-navy-700 mb-3">
                    Vehicle Details
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 font-medium">Number</p>
                      <p className="text-gray-800">{user.vehicle?.number}</p>
                      <p className="text-gray-500 font-medium mt-2">Engine</p>
                      <p className="text-gray-800">{user.vehicle?.engine_number}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Tax Expiry</p>
                      <p className="text-gray-800">
                        {user.vehicle?.tax?.expair_date?.split("T")[0]}
                      </p>
                      <p className="text-gray-500 font-medium mt-2">Insurance Expiry</p>
                      <p className="text-gray-800">{user.vehicle?.insurance?.expair_date?.split("T")[0]}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Chasis</p>
                      <p className="text-gray-800">{user.vehicle?.chasis_number}</p>
                      <p className="text-gray-500 font-medium mt-2">Brand</p>
                      <p className="text-gray-800">{user.vehicle?.brand}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Pollution Expiry</p>
                      <p className="text-gray-800">{user.vehicle?.pollution?.expair_date?.split("T")[0]}</p>
                      <p className="text-gray-500 font-medium mt-2">Mode</p>
                      <p className="text-gray-800">{user.vehicle?.mode}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-5">
                  <h3 className="text-lg font-semibold text-navy-700 mb-3">
                    Referral Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 font-medium">Driving Licence Number</p>
                      <p className="text-gray-800">{user.driving_licence?.Number}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Referral Number</p>
                      <p className="text-gray-800">{user.referal_number?.Number}</p>
                      <p className="text-gray-500 font-medium mt-2">Relation</p>
                      <p className="text-gray-800">
                        {user.referal_number?.relation?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 mt-5'>
                  <p className='text-lg font-semibold text-navy-700 mb-3'>All Documents</p>
                  <div className='flex flex-row gap-3'>
                    {[
                      { name: "Pan Card", url: user.pan?.docs },
                      { name: "Aadhar Card", url: user.aadhar?.docs },
                      { name: "Driving Licence", url: user.driving_licence?.docs },
                      { name: "Tax Receipt", url: user.vehicle?.tax?.docs },
                      { name: "Insurance", url: user.vehicle?.insurance?.docs },
                      { name: "Pollution", url: user.vehicle?.pollution?.docs },
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 transition-all cursor-pointer font-semibold"
                        onClick={() => downloadDocs(item.url)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handelDeleteUser(user._id)}
                    className='mt-5 py-2 text-xl bg-red-400 px-5 rounded-sm text-white font-semibold active:scale-96 transition-all'
                  >
                    Terminate User
                  </button>
                </div>
              </div>

            ) : (
              <div className='w-full flex items-center justify-center h-full'>
                <p className='text-center text-gray-500'>Select User to view details</p>
              </div>
            )}
          </section>
        </main>
      </main>
      <Toaster />
    </main>
  )
}

export default User