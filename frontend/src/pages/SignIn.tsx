import Input from "@/components/Input";
import React from "react";
import { useUserData } from "@/layouts/AuthLayout";

const SignIn: React.FC = () => {
  const userData = useUserData();
  const { email, setEmail, password, setPassword } = userData;

  return (
    <React.Fragment>
      <Input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </React.Fragment>
  );
};

export default SignIn;
