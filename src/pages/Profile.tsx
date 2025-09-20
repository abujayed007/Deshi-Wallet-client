import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { Phone, User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { EditProfile } from "./EditProfile";

export function Profile() {
  const [open, setOpen] = useState(false);
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const user = userInfo?.data?.data;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md rounded-xl border border-gray-200 bg-white">
        <CardHeader className="flex flex-col items-center gap-3">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
              alt={user?.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Name */}
          <CardTitle className="text-xl font-semibold text-gray-800">
            {user?.name}
          </CardTitle>
          <Button onClick={() => setOpen(true)}>Edit Profile</Button>
          {/* Status */}
        </CardHeader>

        {/* Details */}
        <CardContent className="space-y-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-gray-500" />
            <span className="text-sm">{user?.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Status: {user?.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-sm">{user?.role}</span>
          </div>
        </CardContent>
      </Card>
      <EditProfile open={open} onOpenChange={setOpen} />
    </div>
  );
}
