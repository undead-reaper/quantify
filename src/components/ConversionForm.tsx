import { CopyButton } from "@/components/CopyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UnitSelector from "@/components/UnitSelector";
import { convert, formatNumber } from "@/lib/ConversionUtils";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const ConversionForm = ({ category }: { category: Category }) => {
  const [fromUnit, setFromUnit] = useState<string>(category.units[0].name);
  const [toUnit, setToUnit] = useState<string>(category.units[1].name);
  const [inputValue, setInputValue] = useState<string>("1");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fromUnitObj = category.units.find((u) => u.name === fromUnit);
  const toUnitObj = category.units.find((u) => u.name === toUnit);

  useEffect(() => {
    try {
      const numericValue = parseFloat(inputValue);

      if (isNaN(numericValue)) {
        setResult("");
        if (inputValue !== "") {
          setError("Please enter a valid number");
        } else {
          setError(null);
        }
        return;
      }

      setError(null);

      const fromUnitObj = category.units.find(
        (u) => u.name === fromUnit
      ) as Unit;
      const toUnitObj = category.units.find((u) => u.name === toUnit) as Unit;

      const convertedValue = convert(
        numericValue,
        fromUnitObj,
        toUnitObj,
        category
      );
      setResult(formatNumber(convertedValue));
    } catch (err) {
      setResult("");
      setError("Conversion error");
    }
  }, [inputValue, fromUnit, toUnit, category]);

  useEffect(() => {
    if (category.units.length >= 2) {
      setFromUnit(category.units[0].name);
      setToUnit(category.units[1].name);
    }
  }, [category]);

  function handleSwapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="fromUnit" className="block">
              From
            </Label>
            <div className="grid gap-2 sm:flex sm:gap-3 items-start sm:items-center">
              <Input
                id="fromUnit"
                placeholder="Enter value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-lg"
              />

              <UnitSelector
                category={category}
                value={fromUnit}
                onChange={setFromUnit}
                label="from"
                className="w-full md:w-min"
              />
            </div>
          </div>
          <div className="flex justify-center items-center py-2">
            <Button variant="ghost" size="icon" onClick={handleSwapUnits}>
              <ArrowDownUp className="size-4" />
              <span className="sr-only">Swap units</span>
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="toUnit" className="block">
              To
            </Label>
            <div className="w-full grid gap-2 sm:flex sm:gap-3 items-start sm:items-center">
              <div className="relative flex-1">
                <Input
                  id="to-value"
                  readOnly
                  value={result}
                  className="text-lg"
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <CopyButton value={result} className="h-7 w-7" />
                </div>
              </div>
              <UnitSelector
                category={category}
                value={toUnit}
                onChange={setToUnit}
                label="to"
                className="w-full md:w-min"
              />
            </div>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}

          {!error && result && (
            <p className="text-sm text-muted-foreground">
              {inputValue} {fromUnitObj?.symbol} = {result} {toUnitObj?.symbol}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionForm;
