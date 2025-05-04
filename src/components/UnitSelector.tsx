import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UnitSelectorProps {
  category: Category;
  value: string;
  onChange: (unit: string) => void;
  label: string;
  className?: string;
}

const UnitSelector = ({
  category,
  value,
  onChange,
  label,
  className,
}: UnitSelectorProps) => {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full min-h-[2.75rem]">
          <div className="flex items-center justify-between w-full">
            <SelectValue placeholder={`Select ${label} unit`} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {category.units.map((unit) => (
            <SelectItem
              key={unit.name}
              value={unit.name}
              className="min-h-[2.5rem]"
            >
              <div className="flex justify-between w-full">
                <span>{unit.name}</span>
                <span className="text-muted-foreground ml-2">
                  {unit.symbol}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UnitSelector;
