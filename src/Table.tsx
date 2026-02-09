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
    <table className="w-full border border-gray-300 border-collapse rounded-lg overflow-hidden">
      <thead className="bg-indigo-500 text-white">
        <tr>
          {headings.length > 0 &&
            headingsWithButtons.map((heading) => (
              <th className="p-3 text-left" key={heading.id}>
                {heading?.name}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {userList.length > 0 &&
          userList.map((user: UserProps, index: number) => (
            <tr key={user.id}>
              <td className="p-3 border border-gray-200">{index + 1}</td>
              <td className="p-3 border border-gray-200">{user.firstName}</td>
              <td className="p-3 border border-gray-200">{user.lastName}</td>
              <td className="p-3 border border-gray-200">{user.mobile}</td>
              <td className="p-3 border border-gray-200">{user.email}</td>
              <td
                className="p-3 border border-gray-200"
                onClick={() => editData(user)}
              >
                <button>Edit</button>
              </td>
              <td
                className="p-3 border border-gray-200"
                onClick={() => onDelete(user.id as string)}
              >
                <button>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default memo(Table);
