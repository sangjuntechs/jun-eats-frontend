/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState ,useEffect} from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [redBorder, setRedBorder] = useState(false)

  

  useEffect(() => {
    if (errors.password?.type === 'minLength' || errors.password?.message || errors.email?.message) {
        setRedBorder(true)
        console.log(redBorder)
    } else {
        setRedBorder(false)
        console.log(redBorder)
    }
  })

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-20 pb-24 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">로그인</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 mt-5 px-10"
        >
          <input
            {...register("email", { required: "필수 항목입니다." })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className={`bg-gray-100 shadow-inner py-3 px-3 rounded-lg focus:outline-none border-2 ${redBorder ? 'focus:border-red-600 focus:outline-none border-2' : 'focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 '}`}
          />
          {errors.email?.message && (
            <span className="font-normal text-red-600 text-xs">
              {errors.email.message}
            </span>
          )}
          <input
            {...register("password", {
              required: "필수 항목입니다.",
              minLength: 10,
            })}
            name="password"
            required
            type="password"
            placeholder="Password"
            className={`bg-gray-100 shadow-inner py-3 px-3 rounded-lg ${redBorder ? 'focus:border-red-600 focus:outline-none border-2' : 'focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 '} `}
          />
          {errors.password?.message && (
            <span className="font-normal text-red-600 text-xs">
              {errors.password.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-normal text-red-600 text-xs">
              비밀번호는 10글자 이상이어야 합니다.
            </span>
            
          )}
          <button className="py-3 px-3 bg-gray-800 text-white rounded-md hover:opacity-80">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
