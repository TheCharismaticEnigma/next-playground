'use client';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
interface User {
  _id: string;
  username: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User>({} as User);
  const router = useRouter();

  const logout = async function () {
    try {
      await axios.get('api/users/logout');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getPersonalDetails = async () => {
      try {
        const response = await axios.get('/api/users/me');
        const user: User = response.data.data;
        setUser(user);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getPersonalDetails();
  }, [user]);

  return (
    <div className=" flex  flex-col items-center justify-center  min-h-screen">
      <span className="text-4xl">Profile Page</span>

      <button
        onClick={logout}
        className="mt-9 bg-orange-500 hover:bg-orange-400 text-xl text-black py-2 px-3 rounded-md"
      >
        Logout
      </button>

      <Link href={`/profile/${user._id}`}>
        <button className="mt-9 bg-green-500 hover:bg-green-400 text-xl text-black py-2 px-3 rounded-md">
          Redirect
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
