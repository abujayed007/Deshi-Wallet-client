import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import {
  DollarSignIcon,
  LayoutDashboard,
  LockIcon,
  LogsIcon,
  Moon,
  TabletSmartphone,
} from "lucide-react";

export function Features() {
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
      <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-md font-bold">
            <div className="flex gap-4">
              <DollarSignIcon />
              Instant Money Transfer
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <p>
              Send & receive money instantly anytime, anywhere. Securely
              transfer funds to friends, family, or merchants with just a few
              clicks.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-md font-bold">
            <div className="flex gap-4">
              <TabletSmartphone />
              <h1>Cash-In & Cash-Out</h1>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <p>
              Easily add or withdraw money through trusted agents near you.
              Every transaction is secure and tracked in real-time.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-md font-bold">
            <div className="flex gap-4">
              <LockIcon />
              <h1>Secured Transactions</h1>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <p>All accounts are protected and highly secured</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-md font-bold">
            <div className="flex gap-4">
              <LogsIcon />
              <h1> Transaction History</h1>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <p>
              Access your complete transaction history with filtering,
              pagination, and detailed reports for better financial tracking.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-md font-bold">
            <div className="flex gap-4">
              <LayoutDashboard />
              <h1>Role-Based Dashboards</h1>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <p>
              Dedicated dashboards for Users, Agents, and Admins, ensuring a
              tailored experience for every role.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="">
            <div className="flex text-md font-bold gap-4">
              <Moon />
              <h1>Dark/Light Mode</h1>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <p>
              Switch easily between light and dark themes to match your
              preferences and improve accessibility.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
