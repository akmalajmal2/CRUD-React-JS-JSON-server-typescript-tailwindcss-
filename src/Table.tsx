import { memo } from "react";

interface TableProps {
  userList: UserProps[];
  editData: (user: UserProps) => void;
  onDelete: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ userList = [], editData, onDelete }) => {
  console.log(2222, userList[0]?.id);
  const headings = [
    { id: 1, name: "S.NO" },
    { id: 2, name: "First Name" },
    { id: 3, name: "Last Name" },
    { id: 4, name: "Phone Number" },
    { id: 5, name: "Email Address" },
  ];

  let headingsWithButtons = [
    ...headings,
    { id: 100, name: "Edit" },
    { id: 101, name: "Delete" },
  ];
  return (
    <table>
      <thead>
        <tr>
          {headings.length > 0 &&
            headingsWithButtons.map((heading) => (
              <th key={heading.id}>{heading?.name}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {userList.length > 0 &&
          userList.map((user: UserProps, index: number) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.mobile}</td>
              <td>{user.email}</td>
              <td onClick={() => editData(user)}>
                <button>Edit</button>
              </td>
              <td onClick={() => onDelete(user.id as string)}>
                <button>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default memo(Table);
