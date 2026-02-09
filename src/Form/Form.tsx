import { useState } from "react";
import FormField from "./FromField";

const API = import.meta.env.VITE_API_URL;

interface UserFormDataProps {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
}

const Form = () => {
  const inputData = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  };
  const [userFormData, setUserFormData] =
    useState<UserFormDataProps>(inputData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData((prevUser) => ({
      ...prevUser,
      [name as keyof UserFormDataProps]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userFormData),
    });
    setUserFormData(inputData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        value={userFormData.firstName}
        label="First Name"
        placeholder="enter First name"
        required
        name="firstName"
        onChange={handleInputChange}
      />
      <FormField
        value={userFormData.lastName}
        label="Last Name"
        placeholder="enter Last name"
        required
        name="lastName"
        onChange={handleInputChange}
      />
      <FormField
        value={userFormData.mobile}
        label="Phone Number"
        placeholder="enter phone number"
        name="mobile"
        onChange={handleInputChange}
        required
      />
      <FormField
        value={userFormData.email}
        label="Email Address"
        placeholder="enter email address"
        required
        onChange={handleInputChange}
        name="email"
      />
      <button type="submit">Add</button>
    </form>
  );
};
export default Form;
