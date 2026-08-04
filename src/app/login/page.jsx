"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // console.log(user);

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    console.log({ data, error });

    if (data) {
      toast.success("Login Successful!");
      redirect("/");
    }

    if (error) {
      toast.error("Login Unsuccessful!");
    }
  };

  const handleGoogleSignUp = async() =>{
         await authClient.signIn.social({
      provider: "google",
    });
      }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex bg-blue-600 dark:bg-blue-500 p-3 rounded-xl shadow-lg shadow-blue-600/25 dark:shadow-blue-500/20 mb-4">
            <FiLogIn className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold !text-gray-900 dark:!text-gray-100 tracking-tight">
            Login Account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 tracking-wide">
            Start Your Adventure in Wanderlust
          </p>
        </div>

        <Card className="!bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.15)] dark:shadow-black/20 overflow-hidden">
          <Form
            className="flex flex-col gap-4 p-6 md:p-7"
            onSubmit={onSubmit}
          >
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="!text-gray-900 dark:!text-gray-100 font-semibold text-sm">Email</Label>
              <Input
                placeholder="john@example.com"
                className="!bg-gray-50 dark:!bg-gray-800 border-gray-200 dark:border-gray-700 !text-gray-900 dark:!text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
              />
              <FieldError className="text-red-600 dark:text-red-400 text-xs" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="!text-gray-900 dark:!text-gray-100 font-semibold text-sm">Password</Label>
              <Input
                placeholder="Enter your password"
                className="!bg-gray-50 dark:!bg-gray-800 border-gray-200 dark:border-gray-700 !text-gray-900 dark:!text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
              />
              <Description className="text-xs text-gray-500 dark:text-gray-400">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-red-600 dark:text-red-400 text-xs" />
            </TextField>

            <div className="flex gap-2 mt-1">
              <Button
                type="submit"
                className="w-full rounded-full !bg-blue-600 dark:!bg-blue-500 hover:!bg-blue-700 dark:hover:!bg-blue-600 !text-white font-medium py-2.5 shadow-md shadow-blue-600/25 dark:shadow-blue-500/20"
              >
                Login
              </Button>
            </div>
          </Form>
          <div className="text-center space-y-3 px-6 md:px-7 pb-6 md:pb-7">
            <div className="flex items-center gap-3">
              <Separator className="flex-1 bg-gray-200 dark:bg-gray-800" />
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                Or SignUp with
              </span>
              <Separator className="flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>
            <Button
              onClick={handleGoogleSignUp}
              variant="bordered"
              className="w-full border-gray-200 dark:border-gray-700 !text-gray-700 dark:!text-gray-300 hover:!bg-gray-50 dark:hover:!bg-gray-800 rounded-full font-medium"
            >
              <FcGoogle size={18} /> SignUp with Google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;