import { Button } from "@/components/ui/button";
import { useGetAgentsQuery } from "@/redux/features/auth/authApi";
import type { IUser } from "@/types";
import { Link } from "react-router";

const AllAgents = () => {
  const { data: allUsers } = useGetAgentsQuery(undefined);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        {/* Table Head */}
        <thead>
          <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <th className="px-4 py-3 text-left font-semibold tracking-wide">
              NO
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide">
              Name
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide">
              Phone
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide">
              Role
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide">
              Status
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide">
              Show
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {allUsers?.data?.map((user: IUser, index: number) => (
            <tr
              key={user._id}
              className={`transition-colors ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-indigo-50`}
            >
              <td className="px-4 py-3 font-medium text-gray-700">
                {index + 1}
              </td>
              <td className="px-4 py-3 text-gray-700">{user?.name}</td>
              <td className="px-4 py-3 text-gray-700">{user?.phone}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full 
              ${
                user?.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
                >
                  {user?.role}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full
                ${
                  user?.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
                ${
                  user?.status === "SUSPENDED"
                    ? "bg-yellow-100 text-yellow-700"
                    : ""
                }
                ${user?.status === "BLOCK" ? "bg-red-100 text-red-700" : ""}
                ${
                  user?.status === "PENDING"
                    ? "bg-orange-100 text-orange-700"
                    : ""
                }
              `}
                >
                  {user?.status}
                </span>
              </td>
              <td>
                <Button>
                  <Link to={`/admin/user/${user?._id}`}>Show</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAgents;
