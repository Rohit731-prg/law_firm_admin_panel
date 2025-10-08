import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { infoDetails } from "../Utils/infoDetails";
import { infoTypes } from "../Utils/userPage";
import useInfoStore from "../Store/InfoStore";


function Info() {
  const { getAllInfos, infos } = useInfoStore();

  const [distritc, setDistrict] = useState(null);
  const [sub_divition, setSub_divition] = useState(null);
  const [police_station, setPolice_station] = useState(null);
  const [infoDetailsState, setInfoDetailsState] = useState({
    state: null,
    district: null,
    sub_divition: null,
    police_station: null,
    type: "",
    basic_info: {
      name: "",
      number: "",
      address: "",
      pincode: ""
    }
  });

  useEffect(() => {
    getAllInfos("Hospital");
  }, []);

  const setInfo = (id, name) => {
    switch (name) {
      case "state": {
        const state = infoDetails.find((state) => state.id === parseInt(id));
        setInfoDetailsState({ ...infoDetailsState, state: state.state, district: null, sub_divition: null, police_station: null });
        setDistrict(state.districts);
        break;
      }
      case "district": {
        const district = distritc.find((district) => district.name === id);
        setInfoDetailsState({ ...infoDetailsState, district: district.name, sub_divition: null, police_station: null });
        setSub_divition(district.sub_divitions);
        break;
      }
      case "sub_divition": {
        const sub_divitionName = sub_divition.find((sub_divition) => sub_divition.name === id);
        setInfoDetailsState({ ...infoDetailsState, sub_divition: sub_divitionName.name, police_station: null });
        setPolice_station(sub_divitionName.police_stations);
        break;
      }
    }
  }

  const handelSubmit = async (e) => {
    e.preventDefault();

    await useInfoStore.getState().createInfo(infoDetailsState);
  }

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 font-mulish">
      <Sidebar />
      <main className="px-6 py-6 w-full">
        <p className="text-2xl font-semibold text-gray-800 mb-6">centralized section for displaying and managing external data sources</p>

        <div className="flex flex-col lg:flex-row gap-8">
          <section className="bg-white p-5 w-full lg:w-1/3 rounded-sm shadow flex-shrink-0">
            <p className="text-lg font-semibold text-navy-700 mb-4">
              Add a New External Information Source
            </p>

            <form className="space-y-4" onSubmit={handelSubmit}>
              {/* State */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Select a State</label>
                <select
                  onChange={(e) => setInfo(e.target.value, "state")}
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="">Select a State</option>
                  {infoDetails.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Select a District</label>
                <select
                  onChange={(e) => setInfo(e.target.value, "district")}
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="">Select a District</option>
                  {distritc &&
                    distritc.map((district, index) => (
                      <option key={index} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Sub Division */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Select a Sub Division</label>
                <select
                  onChange={(e) => setInfo(e.target.value, "sub_divition")}
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="">Select a Sub Division</option>
                  {sub_divition &&
                    sub_divition.map((sub, index) => (
                      <option key={index} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Police Station */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Select a Police Station</label>
                <select
                  onChange={(e) =>
                    setInfoDetailsState({ ...infoDetailsState, police_station: e.target.value })
                  }
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="">Select a Police Station</option>
                  {police_station &&
                    police_station.map((ps, index) => (
                      <option key={index} value={ps}>
                        {ps}
                      </option>
                    ))}
                </select>
              </div>

              {/* Data Type */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Select Data Type</label>
                <select
                  onChange={(e) =>
                    setInfoDetailsState({ ...infoDetailsState, type: e.target.value })
                  }
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="">Select Data</option>
                  {infoTypes.map((infoType) => (
                    <option key={infoType.id} value={infoType.name}>
                      {infoType.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={infoDetailsState.basic_info.name}
                  onChange={(e) =>
                    setInfoDetailsState({
                      ...infoDetailsState,
                      basic_info: { ...infoDetailsState.basic_info, name: e.target.value },
                    })
                  }
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={infoDetailsState.basic_info.number}
                  onChange={(e) =>
                    setInfoDetailsState({
                      ...infoDetailsState,
                      basic_info: { ...infoDetailsState.basic_info, number: e.target.value },
                    })
                  }
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={infoDetailsState.basic_info.address}
                  onChange={(e) =>
                    setInfoDetailsState({
                      ...infoDetailsState,
                      basic_info: { ...infoDetailsState.basic_info, address: e.target.value },
                    })
                  }
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              {/* Pincode */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Pincode</label>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  value={infoDetailsState.basic_info.pincode}
                  onChange={(e) =>
                    setInfoDetailsState({
                      ...infoDetailsState,
                      basic_info: { ...infoDetailsState.basic_info, pincode: e.target.value },
                    })
                  }
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-900 transition"
              >
                Add Information
              </button>
            </form>


          </section>

          <section className="bg-white p-5 w-full lg:w-2/3 rounded-sm shadow min-h-[700px] overflow-x-auto">
            <p className="text-lg font-semibold text-navy-700 mb-4">
              All Existing External Information
            </p>
            <div className="overflow-x-auto">
              <div className="flex gap-4 mb-4">
                {infoTypes.map((info) => (
                  <button className="bg-black text-white px-5 py-2 hover:bg-white hover:text-black transition border-2 border-black" onClick={() => getAllInfos(info.name)} key={info.id}>{info.name}</button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                    <tr>
                      <th className="py-3 px-2">Name</th>
                      <th className="py-3 px-2 text-right">Number</th>
                      <th className="py-3 px-2">Address</th>
                      <th className="py-3 px-2">State</th>
                      <th className="py-3 px-2">District</th>
                      <th className="py-3 px-2">Police Station</th>
                    </tr>
                  </thead>

                  <tbody>
                    {infos && infos.length ? (
                      infos.map((info) => (
                        <tr
                          key={info._id}
                          className="hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                        >
                          <td className="py-3 px-2">{info.basic_info?.name || "N/A"}</td>
                          <td className="py-3 px-2 text-right">{info.basic_info?.number || "N/A"}</td>
                          <td className="py-3 px-2">{info.basic_info?.address || "N/A"}</td>
                          <td className="py-3 px-2">{info.state || "N/A"}</td>
                          <td className="py-3 px-2">{info.district || "N/A"}</td>
                          <td className="py-3 px-2">{info.police_station || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-gray-500">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>


            </div>
          </section>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default Info;