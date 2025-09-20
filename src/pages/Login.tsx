import loginImage from "@/assets/images/login.jpg";
import LoginForm from "@/components/modules/Authentication/LoginForm";

export default function Login() {
  return (
    <div
      className="relative min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10 
                 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
