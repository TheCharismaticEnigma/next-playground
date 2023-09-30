'use client';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserSchema } from '@/helpers/signupSchema';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>({} as User);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const onSignUp = async () => {
    const newUser: User = {
      password: getValues('password').trimStart().trim(),
      email: getValues('email').trimStart().trim(),
      username: getValues('username').trimStart().trim(),
    };

    setUser(newUser);
    reset();
  };

  return (
    <div className="  gap-10 flex flex-col justify-evenly items-center  min-h-screen">
      <span className=" text-3xl p-1 px-3 ml-2 rounded text-black  bg-orange-500">
        Sign Up
      </span>

      <form
        onSubmit={handleSubmit(onSignUp)}
        className="flex flex-col gap-8 shadow-sm shadow-orange-500 px-3 py-6 rounded-lg"
      >
        <div className="flex flex-col  gap-2 text-xl ">
          <span className="text-red-700 text-md mb-1 italic ">
            {errors?.username?.message}
          </span>

          <label htmlFor="username ">Username</label>
          <input
            {...register('username')}
            type="text"
            id="username"
            spellCheck="false"
            autoCorrect="off"
            name="username"
            className=" text-black text-xl p-1 rounded w-96 focus:outline-0"
          />
        </div>

        <div className="flex flex-col  gap-2 text-xl ">
          {errors?.email && (
            <span className="text-red-700 text-md mb-1 italic ">
              {errors?.email?.message}
            </span>
          )}
          <label htmlFor="email">Email</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            name="email"
            className=" text-black text-xl p-1 rounded w-96 focus:outline-0"
          />
        </div>

        <div className="flex flex-col  gap-2 text-xl ">
          <span className="text-red-700 text-md mb-1 italic ">
            {errors?.password?.message}
          </span>

          <label htmlFor="password">Password</label>
          <input
            {...register('password')}
            type="password"
            id="password"
            name="password"
            className=" text-black text-xl p-1 rounded w-96 focus:outline-0"
          />
        </div>

        <button className="mt-5 bg-orange-500 text-2xl hover:bg-orange-600 text-black rounded mx-auto w-fit py-1 px-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

// No need to provide ENTIRE API ROUTE.
// NEXT JS IS ALREADY CONFIGURED for hitting the target route.

/* 
  <input {...register("age")} />
  <p>{errors.age?.message}</p>
*/
