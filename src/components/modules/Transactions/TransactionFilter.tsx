import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";

const TransactionFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") || undefined;
  const status = searchParams.get("status") || undefined;
  const balance = searchParams.get("balance") || undefined;

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", value);
    setSearchParams(params);
  };

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    setSearchParams(params);
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("balance", value); // always string in query
    } else {
      params.delete("balance");
    }

    setSearchParams(params);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("type");
    params.delete("status");
    params.delete("balance");
    params.delete("createdAt");
    setSearchParams(params);
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Type Filter */}
      <Label className="text-gray-700 dark:text-gray-300">Type</Label>
      <Select value={type ? type : ""} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-30 dark:bg-gray-800 dark:text-gray-200">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="SENDMONEY">Send Money</SelectItem>
            <SelectItem value="ADDMONEY">Add Money</SelectItem>
            <SelectItem value="WITHDRAW">Withdraw</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Label className="text-gray-700 dark:text-gray-300">Status</Label>
      <Select value={status ? status : ""} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-30 dark:bg-gray-800 dark:text-gray-200">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="SUCCESS">Success</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label className="text-gray-700 dark:text-gray-300">Balance</Label>
      <Input
        placeholder="Enter balance"
        value={balance ? balance : ""}
        onChange={handleBalanceChange}
        className="dark:bg-gray-800 dark:text-gray-200"
      />

      <div className="flex justify-between items-center">
        <Button
          className="w-30 p-4"
          size="sm"
          variant="outline"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilter;
