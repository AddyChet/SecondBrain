import { Button } from "../ui/Button";
import { InputCustom } from "../ui/Input";
import { Link, useNavigate} from "react-router";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore";

const Signin = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<{username: string; password: string}>();
  const { login, isLoggingIn } = useAuthStore();

  const onSignIn = (data : object) => login(data, navigate)


  return (
    <div className="w-screen h-screen bg-button-300 flex justify-center items-center">
      <div className="rounded-lg shadow-md p-10 m-5 bg-white">
        <form
          onSubmit={handleSubmit(onSignIn)}
          className="flex justify-center flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-5">Log in</h2>
          <div className="mb-6">
            {" "}
            <span className="">Username</span>
            <InputCustom
              register={register}
              name="username"
              placeholder="Username"
            />
          </div>

          <div className="mb-6">
            <span>Password</span>
            <InputCustom
              type="password"
              register={register}
              name="password"
              placeholder="Password"
            />
          </div>

          {isLoggingIn ? <Button variant="primary" size="md" text="Loading..." /> : <Button variant="primary" size="md" text="Log Inm" />}
        </form>
        <div className="mt-4">
          <p>
            Not Signed Up? Go to{" "}
            <Link to="/signup">
              <span className="text-blue-600">Signup Page</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
