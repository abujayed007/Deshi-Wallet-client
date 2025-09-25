import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Password from "@/components/ui/Password";
import {
  useEditProfileMutation,
  useGetUserInfoQuery,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import type { ApiError } from "@/types";

export interface IEditProfile {
  name: string;
  phone: string;
  password: string;
}

export function EditProfile({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [updateProfile] = useEditProfileMutation();
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const user = userInfo?.data?.data;

  const form = useForm<IEditProfile>({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      password: "",
    },
  });

  const onSubmit = async (data: IEditProfile) => {
    const payload = {
      userId: userInfo?._id,
      ...data,
    };
    try {
      const res = await updateProfile(payload).unwrap();
      if (res?.success) {
        toast.success("Your Profile Updated");
        onOpenChange(false);
      }
    } catch (err) {
      toast.error((err as ApiError)?.data?.message ?? "Something went wrong");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="edit-profile"
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password placeholder="Enter Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="edit-profile">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
