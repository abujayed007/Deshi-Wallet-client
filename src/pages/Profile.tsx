import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { Phone, User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { EditProfile } from "./EditProfile";

export function Profile() {
  const [open, setOpen] = useState(false);
  const { data: userInfo, isLoading } = useGetUserInfoQuery(undefined);
  const user = userInfo?.data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-col items-center gap-3">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                user?.name || "U"
              }`}
              alt={user?.name || "User Avatar"}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Name */}
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {user?.name}
          </CardTitle>

          {/* Edit Button */}
          <Button size="sm" onClick={() => setOpen(true)}>
            Edit Profile
          </Button>
        </CardHeader>

        {/* Details */}
        <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm">{user?.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm">
              Status:{" "}
              <span
                className={`font-medium px-2 py-0.5 rounded-full text-xs 
                ${
                  user?.status === "APPROVED"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : ""
                }
                ${
                  user?.status === "SUSPENDED"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    : ""
                }
                ${
                  user?.status === "BLOCK"
                    ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    : ""
                }
                ${
                  user?.status === "PENDING"
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                    : ""
                }`}
              >
                {user?.status}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm capitalize">{user?.role}</span>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <EditProfile open={open} onOpenChange={setOpen} />
    </div>
  );
}
