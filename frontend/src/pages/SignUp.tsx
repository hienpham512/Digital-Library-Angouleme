import Input from "@/components/Input";
import React from "react";
import { useUserData } from "@/layouts/AuthLayout";

const SignUp: React.FC = () => {
  const userData = useUserData();
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    birthDate,
    setBirthDate,
    isStudent,
    setIsStudent,
  } = userData;


  return (
    <React.Fragment>
      <div className="flex justify-between w-full gap-4">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex gap-6 items-center w-full">
        <label className="text-gray-500 text-xs">Gender:</label>
        <select
          onChange={(e) => setGender(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other" selected>Other</option>
        </select>
      </div>
      <div className="flex w-full gap-2 items-center">
        <label className="text-gray-500 text-xs whitespace-nowrap">Birth date:</label>
        <Input
          type="date"
          name="birthDate"
          placeholder="Birth Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
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
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Input
        type="checkbox"
        name="isStudent"
        placeholder="I am student"
        onChange={(e) => setIsStudent(e.target.checked)}
        checked={isStudent}
      />
    </React.Fragment>
  );
};

export default SignUp;
