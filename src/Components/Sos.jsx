import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { MdRefresh } from "react-icons/md";
import useSosStore from '../Store/SosStore';
import { BsSearch } from "react-icons/bs";
import { sosTable } from '../Utils/tableData';
import { IoIosSend } from "react-icons/io";
import { LuMailPlus } from "react-icons/lu";
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

function Sos() {
    const getAllSos = useSosStore((state) => state.getAllSos);
    const sos = useSosStore((state) => state.sos);
    const setSelectSos = useSosStore((state) => state.setSelectSos);
    const updateSosStatus = useSosStore((state) => state.updateSosStatus);
    const selectedSos = useSosStore((state) => state.selectedSos);
    const deleteSos = useSosStore((state) => state.deleteSos);
    const replySos = useSosStore((state) => state.replySos);

    const [search, setSearch] = useState('');
    const filteredSos = (sos || []).filter((sosE) => (
        sosE?.user?.name?.toLowerCase().includes(search.toLowerCase())
    ));

    const setSosData_updateStatus = (sosE) => {
        setSelectSos(sosE);
        updateSosStatus(sosE._id);
    }

    const handelDelete = async(id) => {
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
            await deleteSos(id);
        }
    }
    const [reply, setReply] = useState('');
    useEffect(() => {
        getAllSos();
    }, []);
    return (
        <main className='flex flex-row min-h-screen bg-gray-100 font-mulish'>
            <Sidebar />
            <main className='px-6 pt-6 w-full'>
                <div className='flex flex-row justify-between items-center'>
                    <p className='text-2xl font-semibold text-gray-800 mb-6'>Your All-in-One Lead Management Solution</p>
                    <button
                        onClick={() => getAllSos()}
                        className='bg-black text-white rounded-full p-2 shadow-2xl text-2xl active:rotate-180'>
                        <MdRefresh />
                    </button>
                </div>

                <div className='flex flex-row gap-5 mt-2'>
                    <section className='lg:w-3/5 bg-white shadow-sm rounded-xl p-5'>
                        <p className='text-lg font-semibold'>All Existing SOS</p>
                        <div className='my-3 flex flex-row gap-3 items-center border border-gray-300 px-4 py-2 rounded-lg mb-4 bg-gray-50'>
                            <BsSearch />
                            <input
                                placeholder='Search SOS by Name'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='w-full outline-none'
                                type="text" />
                        </div>
                        {sos ? (
                            <div>
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                                        <tr>
                                            {sosTable.map((ele, index) => (
                                                <th key={index} className="px-4 py-3">{ele}</th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredSos.map((sosE, index) => (
                                            <tr
                                                key={index}
                                                onClick={() => setSosData_updateStatus(sosE)}
                                                className="hover:bg-gray-50 cursor-pointer transition">
                                                <td className="px-4 py-3">
                                                    <img
                                                        src={sosE?.user?.image}
                                                        alt=""
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">{sosE?.user?.name}</td>
                                                <td className="px-4 py-3">{sosE?.user?.email}</td>
                                                <td className="px-4 py-3">{sosE?.user?.phone}</td>
                                                <td className="px-4 py-3">
                                                    {sosE?.createdAt
                                                        ? new Date(sosE.createdAt).toLocaleString("en-US", {
                                                            year: "numeric",
                                                            month: "numeric",
                                                            day: "numeric",
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        })
                                                        : ""}
                                                </td>
                                                <td className="px-4 py-3">{sosE?.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>
                                <p>No SOS Found</p>
                            </div>
                        )}
                    </section>

                    <section className='lg:w-3/5 bg-white shadow-sm rounded-xl p-5'>
                        {selectedSos ? (
                            <main className='px-5'>
                                <header className='flex flex-row justify-between'>
                                    <div className='flex flex-row gap-3'>
                                        <img src={selectedSos?.user?.image} alt="" className='w-20 h-20 rounded-full' />
                                        <div className='mt-2'>
                                            <p className='text-xl font-semibold'>{selectedSos?.user?.name}</p>
                                            <p className='text-md'>{selectedSos?.user?.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-md font-semibold'>Call : <span className='font-normal'>{selectedSos?.user?.phone}</span></p>
                                    </div>
                                </header>

                                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200 space-y-6 text-gray-800">
                                    {/* Address */}
                                    <div className="text-sm font-medium flex flex-col space-y-1">
                                        <span className="text-gray-500">Address:</span>{" "}
                                        <span className="font-semibold">{selectedSos?.user?.address?.street}</span>
                                        <span className="font-semibold">{selectedSos?.user?.address?.city}</span>
                                        <span className="font-semibold">{selectedSos?.user?.address?.state}</span>
                                        <span className="font-semibold">{selectedSos?.user?.address?.pincode}</span>
                                        <span className="font-semibold">{selectedSos?.user?.address?.policeStation}</span>
                                    </div>

                                    {/* Documents */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            {
                                                id: 1,
                                                name: "Driving License",
                                                value: selectedSos?.user?.driving_licence?.Number,
                                                ex_date: selectedSos?.user?.driving_licence?.expair_date,
                                                document: selectedSos?.user?.driving_licence?.docs
                                            },
                                            {
                                                id: 2,
                                                name: "Tax",
                                                value: selectedSos?.user?.vehicle?.tax?.Number,
                                                ex_date: selectedSos?.user?.vehicle?.tax?.expair_date,
                                                document: selectedSos?.vehicle?.tax?.docs,
                                            },
                                            {
                                                id: 3,
                                                name: "Pollution",
                                                value: selectedSos?.user?.vehicle?.pollution?.Number,
                                                ex_date: selectedSos?.user?.vehicle?.pollution?.expair_date,
                                                document: selectedSos?.vehicle?.pollution?.docs,
                                            },
                                            {
                                                id: 4,
                                                name: "Insurance",
                                                value: selectedSos?.user?.vehicle?.insurance?.Number,
                                                ex_date: selectedSos?.user?.vehicle?.insurance?.expair_date,
                                                document: selectedSos?.vehicle?.insurance?.docs,
                                            },
                                        ].map((item) => (
                                            <div
                                                key={item.id}
                                                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition"
                                            >
                                                <p className="font-semibold text-navy-800 text-sm">{item.name}</p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium text-gray-700">Number:</span>{" "}
                                                    {item.value || "N/A"}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium text-gray-700">Expiry Date:</span>{" "}
                                                    {item.ex_date || "N/A"}
                                                </p>
                                                <button 
                                                onClick={() => window.open(item?.document, "_blank")}
                                                className="mt-3 text-sm border border-navy-600 text-navy-700 hover:bg-black hover:text-white rounded-lg px-3 py-1.5 transition">
                                                    Download {item.name} Document
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Message Section */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="font-medium text-gray-700">
                                            {selectedSos?.user?.name}:{" "}
                                            <span className="text-gray-600 font-normal">{selectedSos?.message}</span>
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            <span className="font-medium">Reply:</span> {selectedSos?.reply || "No reply yet"}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer / Notice Input */}
                                <footer className="flex flex-row items-center gap-3 mt-6 bg-white border-t border-gray-200 px-6 py-3 rounded-b-xl">
                                    <LuMailPlus className="text-gray-500 text-xl" />
                                    <input
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        className="flex-1 outline-none text-sm px-2 py-2 rounded-md border border-gray-300 focus:border-navy-600 transition"
                                        placeholder="Send a notice"
                                        type="text"
                                    />
                                    <button
                                    onClick={() => replySos(selectedSos?._id, reply)}
                                    className="p-2 px-5 bg-black text-white rounded-md hover:bg-navy-800 transition">
                                        <IoIosSend className="text-xl" />
                                    </button>
                                </footer>
                                <button 
                                onClick={() => handelDelete(selectedSos?._id)}
                                className='mt-5 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700'>
                                    delete Sos
                                </button>
                            </main>
                        ) : (
                            <main className='w-full h-full flex flex-col justify-center items-center'>
                                <p className='text-md text-gray-400'>No SOS Selected</p>
                                <p className='text-lg text-gray-400'>To view a SOS, select it from the table</p>
                            </main>
                        )}
                    </section>
                </div>
            </main>
            <Toaster />
        </main>
    )
}

export default Sos