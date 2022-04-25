import { defaultRequest } from "helpers";
import { ISigninRequest } from "pages/signin/type";
import { ISignupRequest } from "pages/signup/type";

const signin = async (signinRequest: ISigninRequest) =>
  await defaultRequest.post("/auth/signin", signinRequest);

const signup = async (signupRequest: ISignupRequest) =>
  await defaultRequest.post("/auth/signup", signupRequest);

export const authApi = {
  signin,
  signup,
};
