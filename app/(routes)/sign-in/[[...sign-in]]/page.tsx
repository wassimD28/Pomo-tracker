import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    // Container with centered content and responsive padding
    <div className="relative flex min-h-screen items-center justify-center bg-custom-black-500 p-4 pointer-events-auto">
      <SignIn
        appearance={{
          elements: {
            footer: "hidden",
          },
        }}
      />
    </div>
  );
}
