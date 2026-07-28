"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShipmentsHeader } from "@/components/shipments/ShipmentsHeader";
import { ShipmentsMetrics } from "@/components/shipments/ShipmentsMetrics";
import { ShipmentsToolbar, StatusFilter, SortOption } from "@/components/shipments/ShipmentsToolbar";
import { ShipmentsGrid } from "@/components/shipments/ShipmentsGrid";
import { ShipmentsTable, SortKey, SortDir } from "@/components/shipments/ShipmentsTable";
import { ShipmentsPagination } from "@/components/shipments/ShipmentsPagination";
import { SHIPMENTS } from "@/lib/data/shipments";
import type { ShipmentsView } from "@/lib/types";

function ShipmentsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // View reflected in the URL (?view=table|grid) per assignment §4.5.
  const urlView = searchParams.get("view") === "table" ? "table" : "grid";
  const [view, setView] = useState<ShipmentsView>(urlView as ShipmentsView);

  const [status, setStatus] = useState<StatusFilter>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  function changeView(next: ShipmentsView) {
    setView(next);
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", next);
    router.replace(`/shipments?${params.toString()}`, { scroll: false });
  }

  function changeStatus(next: StatusFilter) {
    setStatus(next);
    setPage(1);
  }

  function changeSearch(next: string) {
    setSearch(next);
    setPage(1);
  }

  function changeSort(next: SortOption) {
    setSort(next);
    setPage(1);
  }

  function changeSortForTable(key: SortKey) {
    handleSort(key);
    setPage(1);
  }

  function changePageSize(next: number) {
    setPageSize(next);
    setPage(1);
  }

  const filtered = useMemo(() => {
    let rows = SHIPMENTS;
    if (status !== "All") rows = rows.filter((s) => s.stage === status);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.company.toLowerCase().includes(q) ||
          s.originCity.toLowerCase().includes(q) ||
          s.destinationCity.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [status, search]);

  const sorted = useMemo(() => {
    const rows = [...filtered];
    if (view === "grid") {
      switch (sort) {
        case "Oldest":
          rows.reverse();
          break;
        case "Progress: High to Low":
          rows.sort((a, b) => b.progress - a.progress);
          break;
        case "Progress: Low to High":
          rows.sort((a, b) => a.progress - b.progress);
          break;
        default:
          break; // Newest = seeded order
      }
    } else {
      rows.sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        if (sortKey === "progress") return (a.progress - b.progress) * dir;
        if (sortKey === "company") return a.company.localeCompare(b.company) * dir;
        if (sortKey === "eta") return a.eta.localeCompare(b.eta) * dir;
        return a.id.localeCompare(b.id) * dir;
      });
    }
    return rows;
  }, [filtered, sort, sortKey, sortDir, view]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const pageRows = sorted.slice((clampedPage - 1) * pageSize, clampedPage * pageSize);

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    setSelected((prev) => {
      const pageIds = pageRows.map((r) => r.id);
      const allSelected = pageIds.every((id) => prev.has(id));
      const next = new Set(prev);
      pageIds.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <ShipmentsHeader view={view} onViewChange={changeView} />

      {view === "table" && <ShipmentsMetrics />}

      <ShipmentsToolbar
        status={status}
        onStatusChange={changeStatus}
        search={search}
        onSearchChange={changeSearch}
        rightControl={view === "grid" ? "sort" : "dateRange"}
        sort={sort}
        onSortChange={changeSort}
      />

      {view === "grid" ? (
        <ShipmentsGrid shipments={pageRows} />
      ) : (
        <ShipmentsTable
          shipments={pageRows}
          selected={selected}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={changeSortForTable}
        />
      )}

      <ShipmentsPagination
        page={clampedPage}
        pageSize={pageSize}
        total={sorted.length}
        onPageChange={setPage}
        onPageSizeChange={changePageSize}
      />
    </div>
  );
}

export { ShipmentsPageContent };