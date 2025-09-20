import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { useAddMoneyMutation } from "@/redux/features/wallet/wallteApi";
import type { ApiError } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface IAddMoney {
  agentPhone: string;
  userPhone: string;
  balance: string;
}

const AddMoney = () => {
  const { data: agent } = useGetUserInfoQuery(undefined);
  const [addMoney] = useAddMoneyMutation();
  const form = useForm<IAddMoney>({
    defaultValues: {
      agentPhone: "",
      userPhone: "",
      balance: "",
    },
  });

  const onSubmit = async (data: IAddMoney) => {
    const payload = {
      agentPhone: agent?.data?.data?.phone,
      userPhone: data?.userPhone,
      balance: Number(data?.balance),
    };
    try {
      const res = await addMoney(payload).unwrap();
      if (res.success) {
        toast.success("Add money successful");
        form.reset();
      }
      console.log(res);
    } catch (err) {
      toast.error((err as ApiError)?.data?.message ?? "Something went wrong");
    }
  };
  return (
    <div className="flex  justify-center">
      <div className="rounded-lg w-full max-w-2xl p-6">
        <div className="text-center mb-6 space-y-3">
          <h1 className="text-3xl font-bold">Add Money To User Wallet</h1>
          <p className="text-blue-700">Only agent can add money to user</p>
        </div>

        <Form {...form}>
          <form
            id="send-money"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="userPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user's number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      {...field}
                      min="1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button form="send-money" type="submit" className="w-1/2">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddMoney;
