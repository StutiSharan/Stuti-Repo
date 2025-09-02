import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl text-white font-bold mb-3">Profile</h2>
      <p className="text-gray-200">Name: {user?.name}</p>
      <p className="text-gray-200">Email: {user?.email}</p>
      <p className="text-gray-200">Role: {user?.role}</p>
    </div>
  );
}

export default Profile;
