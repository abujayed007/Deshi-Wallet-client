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
      <div className="w-full px-4 sm:px-6 lg:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          <Skeleton className="h-8 w-56 mx-auto" />
        </h2>
        <div className="flex flex-col gap-6">
          {[...Array(5)].map((_, i) => (
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
    <div className="w-full px-4 sm:px-6 lg:px-20 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      {/* Accordion centered & responsive */}
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl md:max-w-3xl mx-auto space-y-4"
      >
        <AccordionItem value="faq-1">
          <AccordionTrigger className="text-md md:text-lg font-semibold">
            How do I create a wallet account?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base leading-relaxed">
            You can create an account by signing up with your phone number or
            email. During registration, you can choose your role as either a
            User or an Agent.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-2">
          <AccordionTrigger className="text-md md:text-lg font-semibold">
            How can I add money to my wallet?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base leading-relaxed">
            Users can add money (Cash-In) through nearby agents. Simply provide
            your wallet ID or phone number to the agent and deposit the amount.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-3">
          <AccordionTrigger className="text-md md:text-lg font-semibold">
            Is my money safe in the wallet?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base leading-relaxed">
            Yes! All transactions are encrypted and accounts are secured with
            JWT-based authentication and password encryption.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-4">
          <AccordionTrigger className="text-md md:text-lg font-semibold">
            Can I send money to any user?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base leading-relaxed">
            Yes, you can send money instantly to any registered wallet user
            using their phone number or email address.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-5">
          <AccordionTrigger className="text-md md:text-lg font-semibold">
            What if I forget my password?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base leading-relaxed">
            You can reset your password from the login page by selecting the
            "Forgot Password" option. A reset link or OTP will be sent to your
            registered email/phone.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
