import React, { useState } from 'react'
import { infoDetails } from '../../Utils/infoDetails';
import ThirdPhase from './ThirdPhase';
import useUserStore from '../../Store/UserStore';

function SecondPhase({
    thredPhase, setSecondPhase, setThredPhase, user, setUser
}) {
    const { registerUser } = useUserStore();
    const handelUser = async (e) => {
        e.preventDefault();
        const result = await registerUser(user);
        if (result) setThredPhase(true);
    };
    const [distritc, setDistrict] = useState([]);
    const [sub_divition, setSub_divition] = useState([]);
    // fix setInfo
    const setInfo = (id, name) => {
        switch (name) {
            case "state": {
                const stateObj = infoDetails.find((s) => s.state === id);
                setUser({
                    ...user,
                    address: { ...user.address, state: stateObj.state, district: "", sub_division: "" },
                });
                setDistrict(stateObj.districts);
                break;
            }
            case "district": {
                const districtObj = distritc.find((d) => d.name === id);
                if (!districtObj) return;
                setUser({
                    ...user,
                    address: { ...user.address, district: districtObj.name, sub_division: "" },
                });
                console.log(districtObj.sub_divitions);
                setSub_divition(districtObj.sub_divitions || []); // ensure array
                break;
            }
            default:
                break;
        }
    };


    return (
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
                            onChange={(e) => setInfo(e.target.value, "state")}
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
                    <div className="flex flex-col flex-1">
                        <label className="text-sm text-gray-600">District</label>
                        <select
                            className='border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none'
                            value={user.address.district}
                            onChange={(e) => setInfo(e.target.value, "district")}
                        >
                            <option value="">Select District</option>
                            {distritc.map((d) => (
                                <option key={d.id} value={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="text-sm text-gray-600">Sub Division</label>
                        <select
                            className='border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none'
                            value={user.address.sub_division}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    address: { ...user.address, sub_division: e.target.value },
                                })
                            }
                        >
                            <option value="">Select Sub Division</option>
                            {sub_divition.map((sd) => (
                                <option key={sd.id} value={sd.name}>
                                    {sd.name}
                                </option>
                            ))}
                        </select>
                    </div>
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
                <ThirdPhase setSecondPhase={setSecondPhase} setThredPhase={setThredPhase} setUser={setUser} />
            )}
        </section>
    )
}

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

export default SecondPhase