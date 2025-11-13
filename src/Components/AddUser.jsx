import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { infoDetails } from "../Utils/infoDetails";
import useUserStore from "../Store/UserStore";
import toast from "react-hot-toast";
import ThirdPhase from "./AddUser/ThirdPhase";
import SecondPhase from "./AddUser/SecondPhase";
import FirstPhase from "./AddUser/FirstPhase";

function AddUser() {
  const {  registerUser, uploadDocs } = useUserStore();
  const [secondPhase, setSecondPhase] = useState(false);
  const [thredPhase, setThredPhase] = useState(false);
  const [vehicle, setVehicle] = useState({
        number: "",
        engine_number: "",
        chasis_number: "",
        brand: "",
        mode: "",
        tax_expair_date: "",
        insurence_expair_date: "",
        pollution_expair_date: "",
        tax: null,
        insurance: null,
        pollution: null,
    });

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        conPassword: "",
        address: {
            state: "",
            street: "",
            city: "",
            district: "",
            sub_division: "",   // <-- corrected
            pincode: "",
            policeStation: "",
        },
        blood_group: "",
        pan_number: "",
        aadhar_number: "",
        driving_licence_number: "",
        driving_licence_expair_date: "",
        referal_number: "",
        relation: "",
        vehicle: "",
        image: null,
    });
  return (
    <main className="flex flex-row min-h-screen bg-gray-100 font-mulish">
      <Sidebar />

      <main className="px-6 py-6 w-full">
        <div className="flex flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Add User here with Authentication
          </p>
        </div>

        <main className="flex flex-row gap-10 mt-5">
          {/* VEHICLE SECTION */}
          <FirstPhase setSecondPhase={setSecondPhase} vehicle={vehicle} setVehicle={setVehicle} />

          {/* USER SECTION */}
          {secondPhase ? (
            <SecondPhase thredPhase={thredPhase} setSecondPhase={setSecondPhase} setThredPhase={setThredPhase} user={user} setUser={setUser} />
          ) : (
            <section className="p-5 bg-white w-1/2 shadow-md rounded-sm flex flex-col items-center justify-center gap-2">
              <p className="text-gray-700 font-medium">
                Please fill the Vehicle form first
              </p>
              <p className="text-sm text-gray-500">
                Only after submitting Vehicle form you can add user
              </p>
            </section>
          )}
        </main>
      </main>
      <Toaster />
    </main>
  );
}

// ---------- REUSABLE INPUT COMPONENTS ----------

const Input = ({ label, type, placeholder, value, onChange }) => (
  <div className="flex flex-col flex-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
    />
  </div>
);

const FileInput = ({ label, onChange }) => (
  <div className="flex flex-col flex-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type="file"
      onChange={onChange}
      className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none file:cursor-pointer file:rounded-md file:border-0 file:bg-black file:px-3 file:py-2 file:text-white"
    />
  </div>
);

export default AddUser;