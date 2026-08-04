import { useBrand } from "@/contexts/BrandContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const brandLabels = {
  "marca-a": "Marca A",
  "marca-b": "Marca B",
} as const;

export function BrandToggle() {
  const { brand, setBrand } = useBrand();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-semibold font-roboto hover:opacity-80 transition-opacity focus:outline-none">
          {brandLabels[brand]}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[160px]">
        <DropdownMenuItem
          onClick={() => setBrand("marca-a")}
          className={brand === "marca-a" ? "font-bold text-primary" : ""}
        >
          Marca A
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setBrand("marca-b")}
          className={brand === "marca-b" ? "font-bold text-primary" : ""}
        >
          Marca B
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
