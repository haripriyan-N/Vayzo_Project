import { useMemo, useState } from "react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Select from "../components/ui/Select";
import { transactionStats, transactions } from "../mock/vayzoApiMock";

const statusBadgeMap = {
  SUCCESS: "success",
  PENDING: "warning",
  FAILED: "danger",
};

const statusOptions = ["All Status", "Success", "Pending", "Failed"];
const typeOptions = ["All Type", "Credit", "Debit", "Refund"];

const normalizeValue = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

function Transactions() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Type");

  const filteredTransactions = useMemo(() => {
    const normalizedQuery = normalizeValue(searchText);

    return transactions.filter((transaction) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [
          transaction.transactionId,
          transaction.userName,
          transaction.description,
          transaction.method,
          transaction.city,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "All Status" ||
        normalizeValue(transaction.status) === normalizeValue(statusFilter);

      const matchesType =
        typeFilter === "All Type" ||
        normalizeValue(transaction.type) === normalizeValue(typeFilter);

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchText, statusFilter, typeFilter]);

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-6 rounded-xl border border-border bg-surface p-4 sm:p-6">
        <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Dashboard {'>'} Transactions
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-foreground">
              Transactions List
            </h1>
            <p className="mt-1 text-sm text-muted">
              Review payment flow, settlement status, and wallet activity.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary">Refresh</Button>
            <Button>Add Transaction</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {transactionStats.map(({ label, value, trend }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-background p-4"
            >
              <p className="text-xs text-muted">{label}</p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <span className="text-2xl font-semibold text-foreground">{value}</span>
                <span className="text-xs font-medium text-emerald-600">{trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-xl">
            <Input
              id="transaction-search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by transaction id, user, description or city"
            />
          </div>

          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <div className="w-full max-w-xs">
              <Select
                id="transaction-status"
                label="Status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full max-w-xs">
              <Select
                id="transaction-type"
                label="Type"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-primary-light text-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Transaction ID</th>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.transactionId} className="border-t border-border bg-surface">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {transaction.transactionId}
                  </td>
                  <td className="px-4 py-3 text-muted">{transaction.userName}</td>
                  <td className="px-4 py-3 text-muted">{transaction.type}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={statusBadgeMap[transaction.status] || "default"}
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-foreground">₹{transaction.amount}</td>
                  <td className="px-4 py-3 text-muted">{transaction.method}</td>
                  <td className="px-4 py-3 text-muted">{transaction.description}</td>
                  <td className="px-4 py-3 text-muted">{transaction.city}</td>
                  <td className="px-4 py-3 text-muted">{transaction.date}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary-light"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted">
            No transactions found for the selected search and filter.
          </div>
        )}
      </div>
    </section>
  );
}

export default Transactions;
