export function convert(
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
  category: Category
): number {
  // Special case for temperature
  if (category.name === "Temperature") {
    return convertTemperature(value, fromUnit.name, toUnit.name);
  }

  // For all other unit types
  const valueInBaseUnit = value * fromUnit.ratio;
  return valueInBaseUnit / toUnit.ratio;
}

function convertTemperature(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  let result: number;

  // Convert to Celsius first
  let inCelsius: number;
  if (fromUnit === "Celsius") {
    inCelsius = value;
  } else if (fromUnit === "Fahrenheit") {
    inCelsius = (value - 32) * (5 / 9);
  } else if (fromUnit === "Kelvin") {
    inCelsius = value - 273.15;
  } else {
    throw new Error(`Unsupported temperature unit: ${fromUnit}`);
  }

  // Convert from Celsius to target unit
  if (toUnit === "Celsius") {
    result = inCelsius;
  } else if (toUnit === "Fahrenheit") {
    result = inCelsius * (9 / 5) + 32;
  } else if (toUnit === "Kelvin") {
    result = inCelsius + 273.15;
  } else {
    throw new Error(`Unsupported temperature unit: ${toUnit}`);
  }

  return result;
}

export function formatNumber(value: number): string {
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(6);
  }

  if (Math.abs(value) >= 1000000) {
    return value.toExponential(6);
  }

  // Use different precision based on value magnitude
  if (Math.abs(value) >= 100) {
    return value.toFixed(2);
  } else if (Math.abs(value) >= 10) {
    return value.toFixed(4);
  } else if (Math.abs(value) >= 1) {
    return value.toFixed(6);
  } else if (Math.abs(value) >= 0.0001) {
    return value.toFixed(8);
  } else {
    return value.toExponential(6);
  }
}
