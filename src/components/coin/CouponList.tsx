import type { EliteCoinTransaction } from "../../common/types/types";

const EliteCoinHistory = ({
  transactions = [],
}: {
  transactions?: EliteCoinTransaction[];
}) => {
  return (
    <div className="bg-white rounded-none sm:rounded-xl shadow-sm p-4 sm:p-6 border w-full overflow-x-auto">

      <h3 className="font-semibold mb-4 text-base sm:text-lg">
        Elite Coin History
      </h3>

      {transactions.length === 0 ? (
        <p className="text-sm text-gray-500">No coin transactions found</p>
      ) : (

        /* SCROLL AREA */
        <div className="w-full overflow-hidden">

          {/* horizontal scroll container */}
          <div className="overflow-x-auto">
            
            {/* IMPORTANT — fixed large width */}
            <div className="min-w-[1000px]">

              <table className="w-full text-xs sm:text-sm border rounded-lg">

                {/* HEADER */}
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left sticky left-0 bg-gray-100 z-20">
                      Txn ID
                    </th>
                    <th className="px-4 py-3 text-left">Order ID</th>
                    <th className="px-4 py-3 text-left">Method</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Previous</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Current</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {transactions.map((tx) => {
                    const isCredit = tx?.type === "CREDIT";

                    return (
                      <tr key={tx?._id} className="border-t hover:bg-gray-50">

                        <td className="px-4 py-4 sticky left-0 bg-white z-10 whitespace-nowrap">
                          {tx?.transaction_id}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {tx?.order_id || "-"}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {tx?.paymentMethod || "-"}
                        </td>

                        <td className={`px-4 py-4 font-semibold whitespace-nowrap ${
                          isCredit ? "text-green-600" : "text-red-600"
                        }`}>
                          {tx?.type}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {tx?.previous_balance}
                        </td>

                        <td className={`px-4 py-4 font-semibold whitespace-nowrap ${
                          isCredit ? "text-green-600" : "text-red-600"
                        }`}>
                          {isCredit ? "+" : "-"} {tx?.coins}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {tx?.current_balance}
                        </td>

                        <td className={`px-4 py-4 font-semibold whitespace-nowrap ${
                          tx?.status === "SUCCESS"
                            ? "text-green-600"
                            : tx?.status === "FAILED"
                            ? "text-red-500"
                            : "text-yellow-600"
                        }`}>
                          {tx?.status}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {new Date(tx?.createdAt).toLocaleString()}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliteCoinHistory;
