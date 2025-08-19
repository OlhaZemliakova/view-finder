import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchComponent() {
  return (
    <div>
      <div className="flex gap-2">
        <Input />
        <Button>Search</Button>
      </div>
    </div>
  );
}
