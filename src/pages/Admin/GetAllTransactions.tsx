import { useGetAllTransactionsQuery } from "@/redux/features/transactions/transactionApi";
import type { ITransaction } from "../TransactionHistory";

const GetAllTransactions = () => {
  const { data: transactions } = useGetAllTransactionsQuery(undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6 md:p-12">
      {/* Transaction History */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-center md:text-left mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Transaction History
        </h3>

        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg">
          <table className="min-w-full text-sm text-gray-700">
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
            <tbody className="divide-y divide-gray-200 bg-white/80 backdrop-blur-lg">
              {transactions?.data?.map((tran: ITransaction, index: number) => (
                <tr
                  key={tran._id}
                  className="hover:bg-purple-50 transition-colors"
                >
                  <td className="px-6 py-3">{index + 1}.</td>
                  <td className="px-6 py-3">{tran.type}</td>
                  <td className="px-6 py-3">{tran?.fromWallet?.phone}</td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      tran.status === "SUCCESS"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {tran.status}
                  </td>
                  <td
                    className={`px-6 py-3 font-bold ${
                      tran.type === "CREDIT" ? "text-green-600" : "text-red-500"
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

        {/* Card/List view for small screens */}
        <div className="grid gap-5 md:hidden">
          {transactions?.data?.map((tran: ITransaction) => (
            <div
              key={tran._id}
              className="bg-white/80 backdrop-blur-lg shadow-md rounded-2xl p-5 border border-gray-200 transition-transform hover:scale-[1.02]"
            >
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Type:</span>
                <span>{tran.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">From:</span>
                <span>{tran.fromWallet?.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Status:</span>
                <span
                  className={
                    tran.status === "SUCCESS"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {tran.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Amount:</span>
                <span
                  className={`font-bold ${
                    tran.type === "CREDIT" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  ${tran.balance}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Time:</span>
                <span>
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
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetAllTransactions;
