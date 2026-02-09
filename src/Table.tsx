interface User {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
}

interface TableProps {
  userList: User[];
}

const Table: React.FC<TableProps> = ({ userList = [] }) => {
  const headings = [
    { id: 1, name: "S.NO" },
    { id: 1, name: "First Name" },
    { id: 1, name: "Last Name" },
    { id: 1, name: "Phone Number" },
    { id: 1, name: "Email Address" },
  ];
  return (
    <table>
      <thead>
        <tr>
          {headings.length > 0 &&
            headings.map((heading) => <th>{heading?.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {userList.length &&
          userList.map((user: User, index: number) => (
            <tr>
              <td>{index + 1}</td>

              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.mobile}</td>
              <td>{user.email}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default Table;
