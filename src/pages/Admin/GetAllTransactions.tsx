import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllTransactionsQuery } from "@/redux/features/transactions/transactionApi";
import type { ITransaction } from "../TransactionHistory";
import TransactionFilter from "@/components/modules/Transactions/TransactionFilter";
import { useSearchParams } from "react-router";
import { useState } from "react";

const GetAllTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit] = useState(10);
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type") || undefined;
  const status = searchParams.get("status") || undefined;
  const balance = searchParams.get("balance") || undefined;
  const { data: transactions } = useGetAllTransactionsQuery({
    type,
    status,
    balance,
    page: currentPage,
    limit,
  });

  const totalPage = transactions?.data?.meta.totalPage || 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-6 md:p-12">
      {/* Header + Filters */}
      <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
          Transaction History
        </h3>
        <TransactionFilter />
      </div>

      {/* ✅ Mobile Cards */}
      <div className="block md:hidden mt-6 space-y-4">
        {transactions?.data?.data?.map((tran: ITransaction, index: number) => (
          <div
            key={tran._id}
            className="bg-white/90 dark:bg-gray-800/90 dark:text-gray-200 backdrop-blur-lg rounded-xl p-4 shadow-md"
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
                <span className="font-semibold">From:</span>{" "}
                {tran?.fromWallet?.phone || "-"}
              </p>
              <p>
                <span className="font-semibold">To:</span>{" "}
                {tran?.toWallet?.phone || "-"}
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
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Serial</th>
              <th className="px-6 py-3 text-left font-semibold">Type</th>
              <th className="px-6 py-3 text-left font-semibold">From</th>
              <th className="px-6 py-3 text-left font-semibold">To</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Amount</th>
              <th className="px-6 py-3 text-left font-semibold">
                Transaction Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
            {transactions?.data?.data?.map(
              (tran: ITransaction, index: number) => (
                <tr
                  key={tran._id}
                  className="hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-3">{index + 1}.</td>
                  <td className="px-6 py-3">{tran.type}</td>
                  <td className="px-6 py-3">{tran?.fromWallet?.phone}</td>
                  <td className="px-6 py-3">{tran?.toWallet?.phone}</td>
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
              )
            )}
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
  );
};

export default GetAllTransactions;
