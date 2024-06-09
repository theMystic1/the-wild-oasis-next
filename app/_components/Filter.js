"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <FilterBtn
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </FilterBtn>

      <FilterBtn
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </FilterBtn>
      <FilterBtn
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </FilterBtn>
      <FilterBtn
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </FilterBtn>
    </div>
  );
}

function FilterBtn({ children, ...props }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        props.activeFilter === props.filter
          ? "bg-primary-700 text-primary-50"
          : ""
      }`}
      onClick={() => props.handleFilter(props.filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
