import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import registerImage from "@/assets/images/register.jpg";

export default function Register() {
  return (
    <div
      className="relative min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10 
                 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${registerImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
