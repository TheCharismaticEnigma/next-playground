import React from 'react';

interface UserProfileProps {
  params: {
    id: string;
  };
}

const UserProfile = ({ params }: UserProfileProps) => {
  return (
    <div className="m-5  flex flex-col items-center justify-center  min-h-screen">
      <span className="text-4xl">
        User Profile
        <span className="p-1 px-3 ml-2 rounded text-black  bg-orange-500">
          {params.id}
        </span>
      </span>
    </div>
  );
};

export default UserProfile;
