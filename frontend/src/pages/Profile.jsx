import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from"../api/APIclient";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get(`/users/${user.id}`);
      setProfile(res.data);
    };
    fetchProfile();
  }, [user]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">Profile</h1>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
}