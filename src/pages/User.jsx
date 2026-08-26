import { Plus, RotateCcw, Search } from "lucide-react";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Select from "../components/ui/Select";

function User() {
  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="rounded-lg border border-border bg-surface p-10 sm:p-5">

        <div className="relative w-full sm:w-1/2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/>
          <Input
            placeholder="Search user by name, email or mobile"
            className="w-full pl-10"/>
			<Input placeholder="Search " className="w-full pl-10"/>
        </div>
		
        <div className="mt-4 flex flex-wrap items-center gap-3">
        </div>

      </div>
    </section>
  );
}

export default User;