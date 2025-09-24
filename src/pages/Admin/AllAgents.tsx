import { Button } from "@/components/ui/button";
import { useGetAgentsQuery } from "@/redux/features/auth/authApi";
import type { IUser } from "@/types";
import { Link } from "react-router";

const AllAgents = () => {
  const { data: allUsers } = useGetAgentsQuery(undefined);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        {/* Table Head */}
        <thead>
          <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
            <th className="px-4 py-3 text-left font-semibold tracking-wide text-white">
              NO
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide text-white">
              Name
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide text-white">
              Phone
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide text-white">
              Role
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide text-white">
              Status
            </th>
            <th className="px-4 py-3 text-left font-semibold tracking-wide text-white">
              Show
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {allUsers?.data?.data?.map((user: IUser, index: number) => (
            <tr
              key={user._id}
              className={`transition-colors ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-gray-800"
                  : "bg-white dark:bg-gray-900"
              } hover:bg-indigo-50 dark:hover:bg-indigo-900`}
            >
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                {index + 1}
              </td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                {user?.name}
              </td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                {user?.phone}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full 
              ${
                user?.role === "admin"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
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
                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                    : ""
                }
                ${
                  user?.status === "SUSPENDED"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                    : ""
                }
                ${
                  user?.status === "BLOCK"
                    ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                    : ""
                }
                ${
                  user?.status === "PENDING"
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-200"
                    : ""
                }
              `}
                >
                  {user?.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <Button variant="secondary">
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
