import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";

export function FAQ() {
  const { isLoading } = useGetUserInfoQuery(undefined);

  if (isLoading) {
    return (
      <div className="container px-6 md:px-20 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          <Skeleton className="h-8 w-56 mx-auto" />
        </h2>
        <div className="flex flex-col gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-5 w-48" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-6 md:px-20 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        <AccordionItem value="faq-1">
          <AccordionTrigger className="text-md font-semibold">
            How do I create a wallet account?
          </AccordionTrigger>
          <AccordionContent className="">
            You can create an account by signing up with your phone number or
            email. During registration, you can choose your role as either a
            User or an Agent.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-2">
          <AccordionTrigger className="text-md font-semibold">
            How can I add money to my wallet?
          </AccordionTrigger>
          <AccordionContent className="">
            Users can add money (Cash-In) through nearby agents. Simply provide
            your wallet ID or phone number to the agent and deposit the amount.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-3">
          <AccordionTrigger className="text-md font-semibold">
            Is my money safe in the wallet?
          </AccordionTrigger>
          <AccordionContent className="">
            Yes! All transactions are encrypted and accounts are secured with
            JWT-based authentication and password encryption.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-4">
          <AccordionTrigger className="text-md font-semibold">
            Can I send money to any user?
          </AccordionTrigger>
          <AccordionContent className="">
            Yes, you can send money instantly to any registered wallet user
            using their phone number or email address.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-5">
          <AccordionTrigger className="text-md font-semibold">
            What if I forget my password?
          </AccordionTrigger>
          <AccordionContent className="">
            You can reset your password from the login page by selecting the
            "Forgot Password" option. A reset link or OTP will be sent to your
            registered email/phone.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
