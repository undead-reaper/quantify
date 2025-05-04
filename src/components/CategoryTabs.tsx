import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { conversionCategories } from "@/lib/ConversionCategories";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
}

const CategoryTabs = ({
  activeCategory,
  onChange,
  className,
}: CategoryTabsProps) => {
  return (
    <Tabs
      value={activeCategory}
      onValueChange={onChange}
      className={cn("w-full h-min", className)}
    >
      <TabsList className="grid grid-cols-4 sm:grid-cols-8 mb-6 gap-1 w-full bg-none h-min">
        {conversionCategories.map((category) => {
          return (
            <TabsTrigger
              key={category.name}
              value={category.name}
              className="flex flex-col w-full h-min items-center gap-1 py-3 px-10 aspect-square"
            >
              {<category.icon className="h-5 w-5" />}
              <span className="text-xs">{category.name}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
