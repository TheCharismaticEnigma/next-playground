'use client';

import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Props {
  searchParams: {
    token: string;
  };
}

const VerifyEmailPage = ({
  searchParams: { token: verificationToken },
}: Props) => {
  const [token, setToken] = useState(verificationToken);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post(`/api/users/verifyemail`, {
        token: token,
      });

      setIsVerified(true);
    } catch (error: any) {
      console.log(error.message);
      setError(true);
    }
  };

  useEffect(() => {
    if (token && token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="w-full  h-screen flex flex-col justify-center items-center">
      <p className=" text-2xl text-center w-fit p-5">
        <span className="mr-3 text-xl">TOKEN : </span>
        <span className="bg-green-600 text-black px-3 py-2 rounded-lg">
          {verificationToken}
        </span>
      </p>
    </div>
  );
};

export default VerifyEmailPage;
