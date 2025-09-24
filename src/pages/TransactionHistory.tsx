import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TransactionFilter from "@/components/modules/Transactions/TransactionFilter";
import { useGetUserTransctionsQuery } from "@/redux/features/transactions/transactionApi";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallteApi";
import type { IUser } from "@/types";
import {
  CheckSquare2Icon,
  DollarSign,
  MenuIcon,
  Phone,
  WalletIcon,
} from "lucide-react";
import { useSearchParams } from "react-router";
import { useState } from "react";

export interface ITransaction {
  _id: string;
  type: string;
  status: string;
  balance: number;
  fromWallet: IUser;
  toWallet: IUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit] = useState(10);
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type") || undefined;
  const status = searchParams.get("status") || undefined;
  const balance = searchParams.get("balance") || undefined;

  const { data: myWallet } = useGetMyWalletQuery(undefined);

  const { data: transactions } = useGetUserTransctionsQuery({
    type,
    status,
    balance,
    page: currentPage,
    limit,
  });
  const totalPage = transactions?.meta.totalPage || 1;
  console.log(totalPage);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 md:p-12 space-y-5">
      {/* Wallet Card */}
      <div className="max-w-lg mx-auto backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800">
        <div className="flex items-center gap-3 mb-5">
          <WalletIcon className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {myWallet?.data?.user.name}'s Wallet
          </h2>
        </div>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <span className="font-semibold flex gap-2">
              <Phone /> Phone:
            </span>
            <span>{myWallet?.data?.user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold flex gap-2">
              <MenuIcon /> Role:
            </span>
            <span className="capitalize">{myWallet?.data?.user.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold flex gap-2">
              <CheckSquare2Icon /> Status:
            </span>
            <span>{myWallet?.data?.user.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold flex gap-2">
              <DollarSign /> Balance:
            </span>
            <span className="text-green-600 dark:text-green-400 font-bold text-lg">
              ${myWallet?.data?.balance}
            </span>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="min-h-screen bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-md p-6">
        {/* Header + Filters */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Transaction History
          </h3>

          <TransactionFilter />
        </div>

        {/* ✅ Mobile Cards */}
        <div className="block md:hidden mt-6 space-y-4">
          {transactions?.data?.map((tran: ITransaction, index: number) => (
            <div
              key={tran._id}
              className="bg-white/90 dark:bg-gray-700 backdrop-blur-lg rounded-xl p-4 shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  #{index + 1}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    tran.status === "SUCCESS"
                      ? "text-green-600 dark:text-green-400"
                      : tran.status === "PENDING"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {tran.status}
                </span>
              </div>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Type:</span> {tran.type}
                </p>
                <p>
                  {tran?.fromWallet?.phone}{" "}
                  <span
                    className={`font-semibold ${
                      tran?.fromWallet?.role === "USER"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-fuchsia-700 dark:text-fuchsia-400"
                    }`}
                  >
                    ({tran?.fromWallet?.role})
                  </span>
                </p>
                <p
                  className={`font-bold ${
                    tran.type === "CREDIT"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  ${tran.balance}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {tran?.createdAt
                    ? `${new Date(
                        tran.createdAt
                      ).toLocaleDateString()} ${new Date(
                        tran.createdAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "-"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Table for Desktop */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg mt-6">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Serial</th>
                <th className="px-6 py-3 text-left font-semibold">Type</th>
                <th className="px-6 py-3 text-left font-semibold">From</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Transaction Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white/80 dark:bg-gray-700/70 backdrop-blur-lg">
              {transactions?.data?.map((tran: ITransaction, index: number) => (
                <tr
                  key={tran._id}
                  className="hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <td className="px-6 py-3">{index + 1}.</td>
                  <td className="px-6 py-3">{tran.type}</td>
                  <td className="px-6 py-3">
                    {tran?.fromWallet?.phone}{" "}
                    <span
                      className={`font-semibold ${
                        tran?.fromWallet?.role === "USER"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-fuchsia-700 dark:text-fuchsia-400"
                      }`}
                    >
                      ({tran?.fromWallet?.role})
                    </span>
                  </td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      tran.status === "SUCCESS"
                        ? "text-green-600 dark:text-green-400"
                        : tran.status === "PENDING"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {tran.status}
                  </td>
                  <td
                    className={`px-6 py-3 font-bold ${
                      tran.type === "CREDIT"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    ${tran.balance}
                  </td>
                  <td className="px-6 py-3">
                    {tran?.createdAt
                      ? `${new Date(
                          tran.createdAt
                        ).toLocaleDateString()} ${new Date(
                          tran.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPage > 1 && (
          <div className="my-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-75"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem
                      key={page}
                      onClick={() => setCurrentPage(page)}
                    >
                      <PaginationLink
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={
                      currentPage === totalPage
                        ? "pointer-events-none opacity-75"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
