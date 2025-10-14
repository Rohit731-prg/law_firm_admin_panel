import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { infoDetails } from "../Utils/infoDetails";
import useUserStore from "../Store/UserStore";
import toast from "react-hot-toast";

function AddUser() {
  const { registerVehicle, registerUser, uploadDocs } = useUserStore();
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
      street: "",
      city: "",
      state: "",
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

  const [docs, setDocs] = useState({
    pan: null,
    aadhar: null,
    driving_licence: null,
  });

  // ------------------- HANDLERS ----------------------

  const handelVehicle = async (e) => {
    e.preventDefault();
    const result = await registerVehicle(vehicle);
    if (result) setSecondPhase(true);
  };

  const handelUser = async (e) => {
    e.preventDefault();
    const result = await registerUser(user);
    if (result) setThredPhase(true);
  };

  const handleDocChange = (name) => (e) => {
    setDocs((prevDocs) => ({
      ...prevDocs,
      [name]: e.target.files[0],
    }));
  };

  const handleDocSubmit = async (e) => {
    e.preventDefault();
    const result = await uploadDocs(docs);

    if (result) {
      toast.success("Documents uploaded successfully!");
      setThredPhase(false);
      setSecondPhase(false);

      // Reset all states
      setVehicle({
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

      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        conPassword: "",
        address: {
          street: "",
          city: "",
          state: "",
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

      setDocs({
        pan: null,
        aadhar: null,
        driving_licence: null,
      });
    }
  };

  // ------------------- JSX ----------------------

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
          <section className="p-5 bg-white w-1/2 shadow-md rounded-sm">
            <p className="text-lg text-gray-500">
              Add new User, 1st Add Vehicle Details
            </p>

            <form className="space-y-4 mt-5" onSubmit={handelVehicle}>
              {/* Vehicle Mode */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">
                  Select Vehicle Mode
                </label>
                <select
                  value={vehicle.mode}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, mode: e.target.value })
                  }
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="">Select a Vehicle Mode</option>
                  {["Two Wheeler", "Three Wheeler", "Four Wheeler"].map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Vehicle and Engine Number */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  label="Vehicle Number"
                  type="text"
                  placeholder="Enter vehicle number"
                  value={vehicle.number}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, number: e.target.value })
                  }
                />
                <Input
                  label="Engine Number"
                  type="text"
                  placeholder="Enter engine number"
                  value={vehicle.engine_number}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, engine_number: e.target.value })
                  }
                />
              </div>

              {/* Chassis and Brand Name */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  label="Chassis Number"
                  type="text"
                  placeholder="Enter chassis number"
                  value={vehicle.chasis_number}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, chasis_number: e.target.value })
                  }
                />
                <Input
                  label="Brand Name"
                  type="text"
                  placeholder="Enter brand name"
                  value={vehicle.brand}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, brand: e.target.value })
                  }
                />
              </div>

              {/* Document Expiry Dates */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  label="Tax Expiry Date"
                  type="date"
                  value={vehicle.tax_expair_date}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, tax_expair_date: e.target.value })
                  }
                />
                <Input
                  label="Insurance Expiry Date"
                  type="date"
                  value={vehicle.insurence_expair_date}
                  onChange={(e) =>
                    setVehicle({
                      ...vehicle,
                      insurence_expair_date: e.target.value,
                    })
                  }
                />
              </div>

              <Input
                label="Pollution Expiry Date"
                type="date"
                value={vehicle.pollution_expair_date}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    pollution_expair_date: e.target.value,
                  })
                }
              />

              {/* File Uploads */}
              <FileInput
                label="Tax Document"
                onChange={(e) =>
                  setVehicle({ ...vehicle, tax: e.target.files[0] })
                }
              />
              <FileInput
                label="Insurance Document"
                onChange={(e) =>
                  setVehicle({ ...vehicle, insurance: e.target.files[0] })
                }
              />
              <FileInput
                label="Pollution Document"
                onChange={(e) =>
                  setVehicle({ ...vehicle, pollution: e.target.files[0] })
                }
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Add Vehicle
              </button>
            </form>
          </section>

          {/* USER SECTION */}
          {secondPhase ? (
            <section className="p-5 bg-white w-1/2 shadow-md rounded-sm">
              <p className="text-lg text-gray-500 mb-4">
                Fill the User Details Info
              </p>

              <form className="space-y-4" onSubmit={handelUser}>
                {/* Name & Email */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    value={user.name}
                    onChange={(e) =>
                      setUser({ ...user, name: e.target.value })
                    }
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>

                {/* Phone & Blood Group */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="Phone"
                    type="text"
                    placeholder="Enter your phone"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                  <Input
                    label="Blood Group"
                    type="text"
                    placeholder="Enter blood group"
                    value={user.blood_group}
                    onChange={(e) =>
                      setUser({ ...user, blood_group: e.target.value })
                    }
                  />
                </div>

                {/* Referral */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="Referral Number"
                    type="text"
                    placeholder="Enter referral number"
                    value={user.referal_number}
                    onChange={(e) =>
                      setUser({ ...user, referal_number: e.target.value })
                    }
                  />
                  <Input
                    label="Relation"
                    type="text"
                    placeholder="Enter relation"
                    value={user.relation}
                    onChange={(e) =>
                      setUser({ ...user, relation: e.target.value })
                    }
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col flex-1">
                    <label className="text-sm text-gray-600">State</label>
                    <select
                      value={user.address.state}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          address: { ...user.address, state: e.target.value },
                        })
                      }
                      className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    >
                      <option value="">Select State</option>
                      {infoDetails.map((state) => (
                        <option key={state.id} value={state.state}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="City"
                    type="text"
                    placeholder="Enter city"
                    value={user.address.city}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        address: { ...user.address, city: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="Street"
                    type="text"
                    placeholder="Enter street"
                    value={user.address.street}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        address: { ...user.address, street: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Police Station"
                    type="text"
                    placeholder="Enter police station"
                    value={user.address.policeStation || ""}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        address: {
                          ...user.address,
                          policeStation: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="Pin Code"
                    type="text"
                    placeholder="Enter pin code"
                    value={user.address.pincode}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        address: { ...user.address, pincode: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Pan Number"
                    type="text"
                    placeholder="Enter PAN number"
                    value={user.pan_number}
                    onChange={(e) =>
                      setUser({ ...user, pan_number: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="Aadhar Number"
                    type="text"
                    placeholder="Enter Aadhar number"
                    value={user.aadhar_number}
                    onChange={(e) =>
                      setUser({ ...user, aadhar_number: e.target.value })
                    }
                  />
                  <Input
                    label="Driving Licence Number"
                    type="text"
                    placeholder="Enter DL number"
                    value={user.driving_licence_number}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        driving_licence_number: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="Driving Licence Expiry Date"
                    type="date"
                    value={user.driving_licence_expair_date}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        driving_licence_expair_date: e.target.value,
                      })
                    }
                  />
                  <FileInput
                    label="Upload Image"
                    onChange={(e) =>
                      setUser({ ...user, image: e.target.files[0] })
                    }
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    value={user.conPassword}
                    onChange={(e) =>
                      setUser({ ...user, conPassword: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black w-full my-3 text-white py-2 rounded-sm hover:bg-gray-800 transition"
                >
                  Submit
                </button>
              </form>

              <hr className="my-4" />

              {/* Document Uploads */}
              {thredPhase && (
                <form className="flex flex-col gap-3" onSubmit={handleDocSubmit}>
                  {[
                    { label: "Driving License Document", name: "driving_licence" },
                    { label: "Pan Card Document", name: "pan" },
                    { label: "Aadhar Card Document", name: "aadhar" },
                  ].map((item, index) => (
                    <FileInput
                      key={index}
                      label={`Upload ${item.label}`}
                      onChange={handleDocChange(item.name)}
                    />
                  ))}

                  <button
                    type="submit"
                    className="bg-black w-full my-3 text-white py-2 rounded-sm hover:bg-gray-800 transition"
                  >
                    Submit Documents
                  </button>
                </form>
              )}
            </section>
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