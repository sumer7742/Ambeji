import { useState } from "react";
import type { Filters } from "../common/types/types";
import type { SortOptionLabel } from "../components/FilterSidebar";
export const useFilters = () => {
    const [filters, setFilters] = useState<Filters>({});
    const [sorts, setSorts] = useState<SortOptionLabel>("relevance")
    return {
        filters, setFilters,
        sorts, setSorts
    }
}