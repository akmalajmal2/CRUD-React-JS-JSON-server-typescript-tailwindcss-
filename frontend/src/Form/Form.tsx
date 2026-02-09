import { useEffect, useState } from "react";
import FormField from "./FromField";
import Button from "../components/Button";

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
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
          min={10}
          max={10}
          onChange={handleInputChange}
          required
        />
        <FormField
          value={userFormData.email}
          type="email"
          label="Email Address"
          placeholder="enter email address"
          required
          onChange={handleInputChange}
          name="email"
        />
      </section>
      <Button type="submit" size="md" className="mx-auto block">
        {editUser ? "Update" : "Add"}
      </Button>
    </form>
  );
};
export default Form;
