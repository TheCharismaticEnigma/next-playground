'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserSchema } from '@/helpers/loginSchema';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast/headless';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const onLogin = async () => {
    try {
      const user: User = {
        email: getValues('email'),
        password: getValues('password'),
      };

      await axios.post('/api/users/login', user);

      toast.success('LOGIN SUCCESSFUL');
      router.push('/profile');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="gap-5 py-5  flex flex-col justify-evenly items-center  min-h-screen">
      <span className=" text-3xl p-1 px-3 ml-2 rounded text-black  bg-orange-500">
        Login
      </span>

      <form
        onSubmit={handleSubmit(onLogin)}
        className="flex flex-col gap-8 shadow-sm shadow-orange-500 px-3 py-6 rounded-lg"
      >
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

        <button className="mt-3 bg-orange-500 text-2xl hover:bg-orange-600 text-black rounded mx-auto w-fit py-1 px-2">
          Submit
        </button>
      </form>

      <div>
        <span className="text-lg">{`Don't Have an account?`} </span>{' '}
        <Link href={'/sign-up'}>
          <span className="ml-1 text-orange-500 hover:text-orange-700 cursor-pointer text-xl underline ">
            Signup
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
