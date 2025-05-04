import "@/App.css";
import CategoryTabs from "@/components/CategoryTabs";
import ConversionForm from "@/components/ConversionForm";
import { conversionCategories } from "@/lib/ConversionCategories";
import { useState } from "react";

function App() {
  const [activeCategory, setActiveCategory] = useState<string>(
    conversionCategories[0].name
  );

  const currentCategory =
    conversionCategories.find((category) => category.name === activeCategory) ||
    conversionCategories[0];

  return (
    <main className="flex-1 py-6 px-4 flex flex-col items-center justify-start md:justify-center w-screen h-screen">
      <div className="container max-w-3xl mx-auto">
        <CategoryTabs
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
        <ConversionForm category={currentCategory} />
      </div>
    </main>
  );
}

export default App;
