import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className=" flex w-full h-svh justify-center items-center">
    <SignUp appearance={{elements:{
      footer: "hidden"
    }}} />;
  </div>
}
