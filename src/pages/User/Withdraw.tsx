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
import { useWithdrawMoneyMutation } from "@/redux/features/wallet/wallteApi";
import type { ApiError } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface IWithdrawMoney {
  agentPhone: string;
  balance: string;
}

const Withdraw = () => {
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const [withdraw] = useWithdrawMoneyMutation();

  const form = useForm<IWithdrawMoney>({
    defaultValues: {
      agentPhone: "",
      balance: "",
    },
  });

  const onSubmit = async (data: IWithdrawMoney) => {
    const payload = {
      userPhone: userInfo?.data?.data?.phone,
      agentPhone: data?.agentPhone,
      balance: Number(data.balance),
    };

    try {
      const res = await withdraw(payload).unwrap();
      if (res.success) {
        toast.success("Withdraw Money Successfull");
        form.reset();
      }
    } catch (err) {
      toast.error((err as ApiError)?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div className="flex  justify-center">
      <div className="rounded-lg w-full max-w-2xl p-6">
        <div className="text-center mb-6 space-y-3">
          <h1 className="text-3xl font-bold">Withdraw Money</h1>
          <p>Only a user can withdraw money</p>
        </div>

        <Form {...form}>
          <form
            id="send-money"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="agentPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Agent Number" {...field} />
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
                Withdraw
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Withdraw;
