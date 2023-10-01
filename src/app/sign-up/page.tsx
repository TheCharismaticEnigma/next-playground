'use client';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserSchema } from '@/helpers/signupSchema';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);

  const onSignUp = async () => {
    // Async function always has to be w/ try-catch block.

    try {
      const newUser: User = {
        password: getValues('password').trimStart().trim(),
        email: getValues('email').trimStart().trim(),
        username: getValues('username').trimStart().trim(),
      };

      setUser(newUser);
      const postResponse = await axios.post('/api/users/sign-up', newUser); // No need of full routes.
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  return (
    <div className="gap-5 py-5  flex flex-col justify-evenly items-center  min-h-screen">
      <span className=" text-3xl p-1 px-3 ml-2 rounded text-black  bg-orange-500">
        Sign up
      </span>

      <form
        onSubmit={handleSubmit(onSignUp)}
        className="flex flex-col gap-8 shadow-sm shadow-orange-500 px-3 py-6 rounded-lg"
      >
        <div className="flex flex-col  gap-2 text-xl ">
          {typeof errors?.username?.message === 'string' && (
            <span className="text-red-700 text-md mb-1 italic ">
              {errors.username.message}
            </span>
          )}

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
          {typeof errors?.email?.message === 'string' && (
            <span className="text-red-700 text-md mb-1 italic ">
              {errors.email.message}
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
          {typeof errors?.password?.message === 'string' && (
            <span className="text-red-700 text-md mb-1 italic ">
              {errors.password.message}
            </span>
          )}

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

      <div>
        <span className="text-lg">Have an account? </span>{' '}
        <Link href={'/login'}>
          <span className="ml-1 text-orange-500 hover:text-orange-700 cursor-pointer text-xl underline ">
            Login
          </span>
        </Link>
      </div>
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
