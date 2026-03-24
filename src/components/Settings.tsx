import React, { useState } from "react";
import { Mail, User, MapPin, Shield } from "lucide-react";
import { useUser } from "../constant/UserProvider";
import { useUpdateProfile, useAddress, useDeleteAddress } from "../hooks/useAddress";
import AddressModal from "../screens/AddressModal";
import toast from "react-hot-toast";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "addresses", label: "Addresses", icon: MapPin },
  // { key: "payments", label: "Payment Methods", icon: CreditCard },
  // { key: "notifications", label: "Notifications", icon: Bell },
  // { key: "security", label: "Security", icon: Lock },
];

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const updateProfile = useUpdateProfile();
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const { data, isLoading, refetch } = useAddress({ pageNumber: 1, pageSize: 50 });
  const deleteAddressMutation = useDeleteAddress();

  const handleDeleteAddress = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      deleteAddressMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Address deleted successfully");
          refetch();
        },
        onError: () => toast.error("Failed to delete address"),
      });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await updateProfile.mutateAsync(formData);
      toast.success(res?.message || "Profile updated successfully!");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-50 border-b md:border-b-0 md:border-r pt-7 md:pt-0">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-left text-sm font-medium transition ${
                activeTab === key
                  ? "bg-blue-100 text-blue-800 border-r-4 border-blue-800"
                  : "hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-800">Profile Information</h2>
              <form className="space-y-4" onSubmit={handleUpdateProfile}>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      preview ||
                      user?.profileImage ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName}`
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full border object-cover"
                  />
                  <label className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer">
                    Change Photo
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={user?.fullName || ""}
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail size={18} className="text-gray-500" />
                    <span>{user?.email || "No email"}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Phone</label>
                  <input
                    name="mobile"
                    type="text"
                    defaultValue={user?.mobile || ""}
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className={`mt-6 px-6 py-2 rounded-lg text-white transition ${
                    updateProfile.isPending
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-800"
                  }`}
                >
                  {updateProfile.isPending ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-800">Saved Addresses</h2>
              {isLoading ? (
                <p>Loading addresses...</p>
              ) : data?.results?.length ? (
                <div className="space-y-4">
                  {data.results.map((addr) => (
                    <div
                      key={addr._id}
                      className="p-4 border rounded-lg shadow-sm bg-gray-50"
                    >
                      <p className="font-medium">{addr.name}</p>
                      <p>
                        {addr.addressLine1}
                        {addr.addressLine2 ? `, ${addr.addressLine2}` : ""},{" "}
                        {addr.city}, {addr.state}, {addr.country} - {addr.postalCode}
                      </p>
                      <p>Phone: {addr.phone}</p>
                      <div className="mt-2 flex gap-3">
                        <button
                          className="text-blue-600 "
                          onClick={() => {
                            setEditingAddress(addr);
                            setShowAddressModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600  "
                          onClick={() => handleDeleteAddress(addr._id!)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No addresses saved yet.</p>
              )}

              <button
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                onClick={() => {
                  setEditingAddress(null);
                  setShowAddressModal(true);
                }}
              >
                Add New Address
              </button>

              {showAddressModal && (
                <AddressModal
                  show={showAddressModal}
                  handleClose={() => setShowAddressModal(false)}
                  isAdd={!editingAddress}
                  data={editingAddress || undefined}
                  refetch={refetch}
                />
              )}
            </div>
          )}

          {/* Security Tab (Purple Accent) */}
          {activeTab === "security" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-700">Security</h2>
              <div className="space-y-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Change Password
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Change MPIN
                </button>
                <div className="flex items-center gap-3 mt-4">
                  <Shield className="text-gray-600" />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    Enable Two-Factor Authentication
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
