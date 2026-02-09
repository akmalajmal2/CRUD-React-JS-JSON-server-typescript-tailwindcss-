import { useEffect, useState } from "react";
import FormField from "./FromField";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface FormProps {
  onAdd: (user: UserProps) => void;
  onUpdate: (user: UserProps) => void;
  editUser: UserProps | null;
}

const Form: React.FC<FormProps> = ({ onAdd, editUser = null, onUpdate }) => {
  let inputData: UserProps = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  };

  const [userFormData, setUserFormData] = useState<UserProps>(inputData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData((prevUser) => ({
      ...prevUser,
      [name as keyof UserProps]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editUser) {
      onUpdate(userFormData);
    } else {
      onAdd(userFormData);
    }
    setUserFormData(inputData);
  };

  useEffect(() => {
    if (editUser) setUserFormData(editUser);
  }, [editUser]);

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
      <button type="submit">{editUser ? "Update" : "Add"}</button>
    </form>
  );
};
export default Form;
