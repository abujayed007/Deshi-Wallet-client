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
      <div className="w-full px-4 sm:px-6 lg:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          <Skeleton className="h-8 w-56 mx-auto" />
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    <div className="w-full px-4 sm:px-6 lg:px-20 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Our Features
      </h2>

      {/* Responsive wrapper */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Each accordion should take full width of its grid cell */}
        <Accordion
          type="single"
          collapsible
          className="w-full col-span-1 sm:col-span-2 lg:col-span-3"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md font-semibold">
              <div className="flex items-center gap-3">
                <DollarSignIcon className="w-5 h-5 shrink-0" />
                <span>Instant Money Transfer</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed">
              Send & receive money instantly anytime, anywhere. Securely
              transfer funds to friends, family, or merchants with just a few
              clicks.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-md font-semibold">
              <div className="flex items-center gap-3">
                <TabletSmartphone className="w-5 h-5 shrink-0" />
                <span>Cash-In & Cash-Out</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed">
              Easily add or withdraw money through trusted agents near you.
              Every transaction is secure and tracked in real-time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-md font-semibold">
              <div className="flex items-center gap-3">
                <LockIcon className="w-5 h-5 shrink-0" />
                <span>Secured Transactions</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed">
              All accounts are protected and highly secured.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-md font-semibold">
              <div className="flex items-center gap-3">
                <LogsIcon className="w-5 h-5 shrink-0" />
                <span>Transaction History</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed">
              Access your complete transaction history with filtering,
              pagination, and detailed reports for better financial tracking.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-md font-semibold">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5 shrink-0" />
                <span>Role-Based Dashboards</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed">
              Dedicated dashboards for Users, Agents, and Admins, ensuring a
              tailored experience for every role.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-md font-semibold">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 shrink-0" />
                <span>Dark/Light Mode</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed">
              Switch easily between light and dark themes to match your
              preferences and improve accessibility.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
