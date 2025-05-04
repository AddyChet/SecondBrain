import { Link, useNavigate } from "react-router";
import { Button } from "../ui/Button";
import { InputCustom } from "../ui/Input";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore";


const Signup = () => {
    
    const { signup, isSigningUp } = useAuthStore();
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const onSignup = (data: object) => {signup(data, navigate)}
  return (
    <div className="w-screen h-screen bg-button-300 flex justify-center items-center">
      <div className="rounded-lg shadow-md p-10 m-5 bg-white">
        <form onSubmit={handleSubmit(onSignup)} className="flex justify-center flex-col items-center">
          <h2 className="text-lg font-semibold mb-5">Sign Up</h2>
          <div className="mb-6">
            {" "}
            <span className="">Username</span>
            <InputCustom type="text" register={register} name="username" placeholder="Username"/>
          </div>

          <div className="mb-6">
            <span>Password</span>
            <InputCustom type="password" register={register} name="password" placeholder="Password" />
          </div>

          {isSigningUp ? <Button variant="primary" size="md" text="Loading..." /> : <Button variant="primary" size="md" text="Sign Up" />}
        </form>
        <div className="mt-4">
          <p>
            Already Signed In? Go to{" "}
            <Link to="/login">
              <span className="text-blue-600">Login Page</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
