import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "~/hooks/auth";

const SignIn = () => {
  const { login } = useAuth();

  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="w-full">
          <h1 className="mb-20 text-5xl font-extrabold">Sign In</h1>

          <div className="w-full">
            <button
              onClick={() => void login("google")}
              className="btn-primary btn-block btn mb-4"
            >
              <FontAwesomeIcon icon={faSignIn} size="lg" className="mr-2" />
              Google
            </button>
            <Link href="/" className="btn-ghost btn-block btn">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
