import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useChangeStatusMutation,
  useGetSingleUserQuery,
} from "@/redux/features/auth/authApi";
import { useEffect } from "react";

type FormValues = {
  status: string;
};

const SingleUser = () => {
  const { id } = useParams<{ id: string }>();
  const [changeStatus] = useChangeStatusMutation();
  const { data: userResponse } = useGetSingleUserQuery(id as string);
  const user = userResponse?.data;

  const form = useForm<FormValues>({
    defaultValues: {
      status: "",
    },
  });

  useEffect(() => {
    if (user?.status) {
      form.setValue("status", user.status);
    }
  }, [user, form]);

  const handleChangeStatus = async (data: FormValues) => {
    if (!data.status) return;
    console.log(data);
    const info = {
      id: user?._id,
      status: data!.status as string,
    };
    console.log(info);
    try {
      const res = await changeStatus(info).unwrap();
      console.log("Status updated:", res);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="flex mx-auto max-w-lg w-full">
      <Card className="w-full shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="p-6 flex flex-col items-center text-center bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
              alt="Bot Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-xl font-semibold">{user?.name}</CardTitle>
          <p className="text-sm text-muted-foreground uppercase">
            Role: {user?.role}
          </p>

          <div className="mt-4 w-full">
            <Select
              value={form.watch("status")}
              onValueChange={(value) => form.setValue("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="APPROVED">APPROVED</SelectItem>
                <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                <SelectItem value="BLOCKED">BLOCKED</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="mt-2 w-full"
              onClick={form.handleSubmit(handleChangeStatus)}
            >
              Save
            </Button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 space-y-4">
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="font-medium">{user?.phone}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleUser;
