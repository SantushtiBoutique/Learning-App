"use client"

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300); // Debounce for 300ms

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const pushUrl = () => {
      const url = qs.stringifyUrl({
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      }, { skipEmptyString: true, skipNull: true });
      
      router.push(url);
    };

    const timeoutId = setTimeout(pushUrl, 300); // Debounce the router push function

    return () => clearTimeout(timeoutId);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  const clearSearch = () => {
    setValue("");
  };

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-[#0c0a09] focus-visible:ring-[#1c1917]"
        placeholder="Search for a course"
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600"
        >
        </button>
      )}
    </div>
  );
};
