'use client';

import Link from 'next/link';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface User {
  name: string;
  password: string;
  username: string;
}

const SignUpPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>({} as User);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignUp = async () => {};

  return (
    <div className="m-5">
      <span className="text-4xl">Sign Up Page </span>
    </div>
  );
};

export default SignUpPage;
