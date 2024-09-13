// UsersTable.js

import { FaEdit, FaTrash } from "react-icons/fa";

const UsersTable = ({
  users,
  handleDeleteUser,
  handleEditUser,
}: {
  users: any[];
  handleDeleteUser: (id: string) => void;
  handleEditUser: (user: any) => void;
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="text-left py-2 px-3">Username</th>
            <th className="text-left py-2 px-3">Email</th>
            <th className="text-left py-2 px-3">Role</th>
            <th className="text-left py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="text-left py-3 px-4">{user.username}</td>
              <td className="text-left py-3 px-4">{user.email}</td>
              <td className="text-left py-3 px-4">{user.role}</td>
              <td className="text-left py-3 px-4">
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="ml-2 text-red-600 hover:text-red-900"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
