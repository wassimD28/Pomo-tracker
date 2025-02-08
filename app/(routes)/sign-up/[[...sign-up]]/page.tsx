import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className=" flex w-full h-svh justify-center items-center pointer-events-auto bg-custom-black-500">
    <SignUp appearance={{elements:{
      footer: "hidden"
    }}} />;
  </div>
}
