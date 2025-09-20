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
import { useSendMoneyMutation } from "@/redux/features/wallet/wallteApi";
import type { ApiError } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface ISendMoney {
  receiverPhone: string;
  balance: string;
}

const SendMoney = () => {
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const [sendMoney] = useSendMoneyMutation();

  const form = useForm<ISendMoney>({
    defaultValues: {
      receiverPhone: "",
      balance: "",
    },
  });

  const onSubmit = async (data: ISendMoney) => {
    const payload = {
      senderPhone: userInfo?.data?.data?.phone,
      receiverPhone: data.receiverPhone,
      balance: Number(data.balance),
    };

    try {
      const res = await sendMoney(payload).unwrap();
      if (res.success) {
        form.reset();
        toast.success("Send Money Successfull");
      }
    } catch (err) {
      toast.error((err as ApiError)?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div className="flex  justify-center">
      <div className="rounded-lg w-full max-w-2xl p-6">
        <div className="text-center mb-6 space-y-3">
          <h1 className="text-3xl font-bold">Send Money</h1>
          <p>Only a user can send money to user</p>
        </div>

        <Form {...form}>
          <form
            id="send-money"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="receiverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter receiver number" {...field} />
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

export default SendMoney;
