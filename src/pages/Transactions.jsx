import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Eye,
  MoreVertical,
  RefreshCw,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import FilterPanel from "../components/ui/FilterPanel";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import DateRangeInput from "../components/ui/DateRangeInput";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";
import { exportToCSV } from "../utils/exportUtils";
import { transactionStats, transactions } from "../mock/vayzoApiMock";
const statusMap = { SUCCESS: "success", PENDING: "warning", FAILED: "danger" };
const tabs = ["All Transactions", "Success", "Pending", "Failed"];

const label = (item) => String(item || "").replaceAll("_", " ");
function Transactions() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Type");
  const [tab, setTab] = useState(tabs[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [transactionList, setTransactionList] = useState(transactions);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    amount: "",
    type: "CREDIT",
    method: "UPI",
    description: "",
    city: "",
    status: "SUCCESS",
  });
  const filtered = useMemo(
    () =>
      transactionList.filter((item) => {
        const matchesQuery =
          !query ||
          [
            item.transactionId,
            item.userName,
            item.description,
            item.method,
            item.city,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase());
        const date = item.date.slice(0, 10);
        const [start, end] = dateRange;
        const startDate = start
          ? new Date(start).toISOString().slice(0, 10)
          : null;
        const endDate = end ? new Date(end).toISOString().slice(0, 10) : null;
        return (
          matchesQuery &&
          (status === "All Status" ||
            item.status.toLowerCase() === status.toLowerCase()) &&
          (type === "All Type" ||
            item.type.toLowerCase() === type.toLowerCase()) &&
          (tab === tabs[0] || item.status === tab.toUpperCase()) &&
          (!startDate || date >= startDate) &&
          (!endDate || date <= endDate)
        );
      }),
    [query, status, type, tab, transactionList, dateRange],
  );
  const update = (key) => (event) =>
    setForm({ ...form, [key]: event.target.value });
  const refresh = () => {
    setQuery("");
    setStatus("All Status");
    setType("All Type");
    setTab(tabs[0]);
    setDateRange([null, null]);
    setTransactionList([...transactions]);
  };
  const addTransaction = (event) => {
    event.preventDefault();
    setTransactionList([
      {
        transactionId: `TXN${Date.now().toString().slice(-4)}`,
        userName: form.userName,
        type: form.type,
        status: form.status,
        amount: Number(form.amount),
        method: form.method,
        description: form.description,
        city: form.city,
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
      },
      ...transactionList,
    ]);
    setForm({
      userName: "",
      amount: "",
      type: "CREDIT",
      method: "UPI",
      description: "",
      city: "",
      status: "SUCCESS",
    });
    setShowAdd(false);
  };
  return (
    <section className="min-h-full bg-background p-3 sm:p-4">
      <div className="space-y-3">
        <header className="flex flex-wrap items-center justify-end gap-2 border-b border-border pb-3">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={refresh}>
              <RefreshCw size={14} className="mr-1.5" />
              Refresh
            </Button>
            <Button size="sm" onClick={() => setShowAdd(true)}>
              + Add Transaction
            </Button>
          </div>
        </header>

        <Card noPadding className="flex flex-col overflow-hidden">
          <FilterPanel
            search={
              <SearchInput
                id="transaction-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by ID, user, description..."
              />
            }
            actions={
              <Button
                variant="secondary"
                size="sm"
                className="h-10 w-full sm:w-auto"
                onClick={() => exportToCSV(transactionList, "transactions.csv")}
              >
                <Download size={14} className="mr-1.5" /> Export
              </Button>
            }
            filters={
              <>
                <StatusSelect
                  id="transaction-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  options={["All Status", "Success", "Pending", "Failed"]}
                  className="w-full sm:w-[150px]"
                />
                <Select
                  id="transaction-type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="w-full sm:w-[150px]"
                >
                  <option>All Type</option>
                  <option>Credit</option>
                  <option>Debit</option>
                  <option>Refund</option>
                </Select>
                <div className="w-full sm:w-auto">
                  <DateRangeInput
                    fromValue={dateRange[0]}
                    toValue={dateRange[1]}
                    onFromChange={(e) =>
                      setDateRange([e.target.value, dateRange[1]])
                    }
                    onToChange={(e) =>
                      setDateRange([dateRange[0], e.target.value])
                    }
                  />
                </div>
              </>
            }
            hasActiveFilters={
              query ||
              status !== "All Status" ||
              type !== "All Type" ||
              dateRange[0] ||
              dateRange[1]
            }
            onReset={refresh}
          />
          <div className="bg-surface px-4">
            <nav className="flex gap-4 overflow-hidden border-b border-border mt-2">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium ${tab === item ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-1 w-full flex flex-col min-h-0 overflow-hidden border-t border-border">
            <Table
              headers={[
                "Transaction ID",
                "User",
                "Type",
                "Status",
                "Amount",
                "Method",
                "Description",
                "Date",
                "Actions",
              ]}
              currentCount={filtered.length}
              totalCount={transactionList.length}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              minWidth="1050px"
              className="border-0 shadow-none rounded-none border-t-0"
            >
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="p-8 text-center text-sm text-muted"
                  >
                    No transactions found for the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.transactionId}
                    onClick={() =>
                      alert(`View details for ${item.transactionId}`)
                    }
                    className="border-b border-border hover:bg-surface-50 transition-colors text-sm last:border-0 cursor-pointer"
                  >
                    <td className="truncate px-4 py-4 font-medium text-foreground whitespace-nowrap">
                      {item.transactionId}
                    </td>
                    <td className="truncate px-4 py-4 text-muted whitespace-nowrap">
                      {item.userName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className="px-2 py-0.5 rounded-md font-medium text-[10px] tracking-wider uppercase"
                      >
                        {item.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          statusMap[item.status.toUpperCase()] || "default"
                        }
                        className="px-2 py-0.5 rounded-full font-medium"
                      >
                        {label(item.status)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 font-medium text-foreground whitespace-nowrap">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4 text-muted whitespace-nowrap">
                      {item.method}
                    </td>
                    <td
                      className="truncate px-4 py-4 text-muted max-w-[200px]"
                      title={item.description}
                    >
                      {item.description}
                    </td>
                    <td className="px-4 py-4 text-muted whitespace-nowrap text-xs">
                      {item.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          aria-label={`View ${item.transactionId}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`View ${item.transactionId}`);
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded border border-border text-primary hover:bg-primary-light"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          aria-label={`More actions for ${item.transactionId}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`More actions for ${item.transactionId}`);
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded border border-border text-primary hover:bg-primary-light"
                        >
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </Table>
          </div>
        </Card>
        {showAdd && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/30 p-4">
            <form
              onSubmit={addTransaction}
              className="w-full max-w-xl rounded-xl border border-border bg-surface p-5 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Add Transaction
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Input
                  id="transaction-user"
                  label="User"
                  value={form.userName}
                  onChange={update("userName")}
                  placeholder="Enter user name"
                  required
                />
                <Input
                  id="transaction-amount"
                  label="Amount"
                  type="number"
                  min="0"
                  value={form.amount}
                  onChange={update("amount")}
                  placeholder="Enter amount"
                  required
                />
                <Select
                  id="transaction-form-type"
                  label="Type"
                  value={form.type}
                  onChange={update("type")}
                >
                  <option>CREDIT</option>
                  <option>DEBIT</option>
                  <option>REFUND</option>
                </Select>
                <Input
                  id="transaction-method"
                  label="Method"
                  value={form.method}
                  onChange={update("method")}
                  placeholder="UPI / Card / Wallet"
                  required
                />
                <Input
                  id="transaction-description"
                  label="Description"
                  value={form.description}
                  onChange={update("description")}
                  placeholder="Enter description"
                  required
                />
                <Input
                  id="transaction-city"
                  label="City"
                  value={form.city}
                  onChange={update("city")}
                  placeholder="Enter city"
                  required
                />
                <Select
                  id="transaction-form-status"
                  label="Status"
                  value={form.status}
                  onChange={update("status")}
                >
                  <option>SUCCESS</option>
                  <option>PENDING</option>
                  <option>FAILED</option>
                </Select>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Transaction</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default Transactions;
