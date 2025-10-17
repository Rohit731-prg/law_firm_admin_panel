import { useEffect, useState } from "react";
import useUserStore from "../Store/UserStore";
import { usersTable } from "../Utils/tableData";
import { bulkSmsButton, filterBtnList } from "../Utils/userPage";
import Sidebar from "./Sidebar"
import { LuSearch } from "react-icons/lu";
import useNoticeStore from "../Store/noticeStore";
import { Toaster } from "react-hot-toast";

function Notice() {
    const { user, users, getAllUsers, getUserDetailsByID, filterUser } = useUserStore();
    const { sendNotice, sendBulkSms } = useNoticeStore();

    const [search, setSearch] = useState('');
    const filteredUser = users?.filter((user) => user?.name?.toLowerCase().includes(search.toLowerCase()));

    const [message, setMessage] = useState('');

    const handelSendSms = async () => {
        await sendNotice(user?.phone, message);
    }

    const sendSMSBulk_function = async (name) => {
        await sendBulkSms(name);
    }

    useEffect(() => {
        getAllUsers();
    }, []);
    return (
        <main className='flex flex-row min-h-screen bg-gray-100 font-mulish'>
            <Sidebar />
            <main className="px-6 py-6 w-full">
                <div className='flex flex-row justify-between items-center'>
                    <p className="text-2xl font-semibold text-gray-800 mb-6">
                        Track, manage, and convert your Users with ease
                    </p>
                </div>
                <main className="flex flex-row gap-10">
                    <section className="p-5 bg-white w-1/2 shadow-md rounded-sm">
                        <p className="text-lg font-semibold">All Existing Users List</p>
                        <div className="flex flex-row gap-5 items-center">
                            <p>Filter Users by Document Type</p>
                            <select onChange={(e) => filterUser(e.target.value)} className="bg-black text-white px-5 py-2">
                                <option value="">Select any Type</option>
                                {filterBtnList.map((item, i) => (
                                    <option value={item.value} key={i}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="my-2 flex flex-row gap-2 items-center border border-gray-300 px-4 py-2 rounded-lg mb-5 bg-gray-50">
                            <LuSearch />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by Name"
                                className="outline-none w-full text-sm bg-transparent"
                                type="text" />
                        </div>

                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                                {usersTable.map((item, i) => (
                                    <th key={i} className="py-3 px-2">
                                        {item}
                                    </th>
                                ))}
                            </thead>
                            {users ? (
                                <tbody>
                                    {filteredUser?.map((user, i) => (
                                        <tr onClick={() => getUserDetailsByID(user?._id)} key={i} className="hover:bg-gray-50 cursor-pointer transition">
                                            <td className="py-3 px-2">
                                                <img src={user?.image} alt="" className="w-12 h-12 rounded-full object-cover" />
                                            </td>
                                            <td className="py-3 px-2">{user?.name}</td>
                                            <td className="py-3 px-2">{user?.phone}</td>
                                            <td className="py-3 px-2">{user?.email}</td>
                                            <td className="py-3 px-2">{user?.vehicle?.mode}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <td>No Data Found</td>
                                </tbody>
                            )}
                        </table>
                    </section>
                    <section className="w-1/2">
                        <div>
                            {bulkSmsButton.map((item, i) => (
                                <button
                                onClick={() => sendSMSBulk_function(item.value)}
                                key={i} 
                                className="bg-black text-white px-5 py-2 mx-1">
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        {user ? (
                            <div className="mt-5 bg-white p-5 rounded-sm shadow-md">
                                <p>All Details about User</p>

                                <div className="bg-gray-100 p-5 my-3">
                                    <div className=" rounded-xl p-6 w-full">
                                        <div className="flex flex-col items-start mb-6">
                                            <img
                                                src={user?.image}
                                                alt={user?.name || "User Image"}
                                                className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm mb-4"
                                            />
                                            <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                            <p className="text-sm text-gray-500">{user?.phone}</p>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Driving License Expiry:</span>
                                                <span className="font-medium text-gray-800">
                                                    {user?.driving_licence?.expair_date
                                                        ? user.driving_licence.expair_date.split("T")[0]
                                                        : "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tax Expiry:</span>
                                                <span className="font-medium text-gray-800">
                                                    {user?.vehicle?.tax?.expair_date
                                                        ? user?.vehicle?.tax?.expair_date.split("T")[0]
                                                        : "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Insurance Expiry:</span>
                                                <span className="font-medium text-gray-800">
                                                    {user?.vehicle?.insurance?.expair_date
                                                        ? user?.vehicle?.insurance?.expair_date.split("T")[0]
                                                        : "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Pollution Expiry:</span>
                                                <span className="font-medium text-gray-800">
                                                    {user?.vehicle?.pollution?.expair_date
                                                        ? user?.vehicle?.pollution?.expair_date.split("T")[0]
                                                        : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    <div>
                                        {[
                                            { id: 1, name: "Driving License", value: user?.driving_licence?.docs },
                                            { id: 2, name: "Tax", value: user?.vehicle?.tax?.docs },
                                            { id: 3, name: "Insurance", value: user?.vehicle?.insurance?.docs },
                                            { id: 4, name: "Pollution", value: user?.vehicle?.pollution?.docs },
                                        ].map((item) => (
                                            <button
                                                onClick={() => window.open(item.value, "_blank")}
                                                className="bg-black text-white text-sm px-5 py-2 mx-1 my-2"
                                                key={item.id}>
                                                Download {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <textarea
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    placeholder="Write Your Message Here"
                                    className="w-full my-1 outline-none bg-gray-300 p-2 rounded-sm "
                                ></textarea>
                                <button
                                    onClick={() => handelSendSms()}
                                    className="bg-black text-white w-full py-2"
                                >
                                    Send
                                </button>
                            </div>
                        ) : (
                            <div className="w-full min-h-[400px] bg-white mt-5 flex flex-col items-center justify-center">
                                <p className="text-lg text-gray-400">No User Selected</p>
                                <p className="text-lg text-gray-400">Please Select User From List To Send Message</p>
                            </div>
                        )}
                    </section>
                </main>
            </main>
            <Toaster />
        </main>
    )
}

export default Notice