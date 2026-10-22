import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
};

const products: Product[] = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 199000, stock: 20 },
  { id: 2, name: "Mechanical Keyboard", category: "Electronics", price: 890000, stock: 12 },
  { id: 3, name: "USB-C Hub", category: "Accessories", price: 450000, stock: 8 },
  { id: 4, name: "Laptop Stand", category: "Accessories", price: 320000, stock: 15 },
  { id: 5, name: "Bluetooth Headphones", category: "Electronics", price: 690000, stock: 6 },
  { id: 6, name: "Webcam HD", category: "Electronics", price: 550000, stock: 10 },
  { id: 7, name: "Desk Lamp", category: "Home", price: 275000, stock: 18 },
  { id: 8, name: "Notebook Set", category: "Stationery", price: 85000, stock: 30 },
  { id: 9, name: "Wireless Charger", category: "Accessories", price: 390000, stock: 7 },
  { id: 10, name: "Travel Backpack", category: "Bags", price: 590000, stock: 14 },
  { id: 11, name: "Portable SSD", category: "Electronics", price: 1250000, stock: 5 },
  { id: 12, name: "Phone Holder", category: "Accessories", price: 120000, stock: 22 },
];

const columns: ColumnDef<Product>[] = [
  { header: "Product ID", accessorKey: "id", sortable: true },
  { header: "Product Name", accessorKey: "name", sortable: true },
  { header: "Category", accessorKey: "category", sortable: true },
  { header: "Price (VND)", accessorKey: "price", sortable: true },
  { header: "Stock", accessorKey: "stock", sortable: true },
];

type SortKey = keyof Product;

const PAGE_SIZE = 5;

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price);
}

export default function App() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeCell, setActiveCell] = useState({
    row: 0,
    col: 0,
  });

  const tableRef = useRef<HTMLTableElement>(null);

  // Step 1: Filter
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) =>
      [
        product.id,
        product.name,
        product.category,
        product.price,
        product.stock,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  // Step 2: Sort
  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    result.sort((a, b) => {
      const first = a[sortKey];
      const second = b[sortKey];

      let comparison: number;

      if (
        typeof first === "string" &&
        typeof second === "string"
      ) {
        comparison = first.localeCompare(second);
      } else {
        comparison = Number(first) - Number(second);
      }

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [filteredProducts, sortKey, sortDirection]);

  // Step 3: Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Reset to the first page when search changes.
  useEffect(() => {
    setPage(1);
    setActiveCell({ row: 0, col: 0 });
  }, [search]);

  // Keep the current page valid when the result count changes.
  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((previous) =>
        previous === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }

    setPage(1);
    setActiveCell({ row: 0, col: 0 });
  }

  function selectProduct(product: Product) {
    setSelectedId((previous) =>
      previous === product.id ? null : product.id
    );
  }

    function handleGridKeyDown(
    event: KeyboardEvent<HTMLTableElement>
  ) {
    const target = event.target as HTMLElement;

    // Do not intercept keyboard input in the search field
    // or in the column sorting buttons.
    if (
      target.closest("input, button") ||
      !target.closest("td")
    ) {
      return;
    }

    const rowCount = visibleProducts.length;
    const colCount = columns.length;

    if (rowCount === 0) return;

    let { row, col } = activeCell;

    switch (event.key) {
      case "ArrowUp":
        row = Math.max(0, row - 1);
        break;
      case "ArrowDown":
        row = Math.min(rowCount - 1, row + 1);
        break;
      case "ArrowLeft":
        col = Math.max(0, col - 1);
        break;
      case "ArrowRight":
        col = Math.min(colCount - 1, col + 1);
        break;
      case "Enter":
        event.preventDefault();
        setSelectedId(visibleProducts[row].id);
        return;
      case " ":
        event.preventDefault();
        selectProduct(visibleProducts[row]);
        return;
      default:
        return;
    }

    event.preventDefault();
    setActiveCell({ row, col });

    tableRef.current
      ?.querySelector<HTMLElement>(
        `[data-row="${row}"][data-col="${col}"]`
      )
      ?.focus();
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">MINI FLASH SALE LAB</p>
        <h1>Flash Sale Product Dashboard</h1>
        <p className="page-description">
          Browse, filter, sort and select flash sale products.
        </p>
      </header>

      <section
        className="panel"
        aria-labelledby="products-heading"
      >
        <div className="panel-header">
          <div>
            <h2 id="products-heading">Product Inventory</h2>
            <p className="muted">
              {sortedProducts.length} products found
            </p>
          </div>

          <label className="search-label">
            Search products
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search name, category, price..."
              aria-label="Search products by name, category, ID, price or stock"
            />
          </label>
        </div>

        <p id="keyboard-help" className="keyboard-help">
          Keyboard: use arrow keys to navigate cells.
          Press Enter to select or Space to toggle selection.
        </p>

        <div className="table-wrapper">
          <table
            ref={tableRef}
            role="grid"
            aria-label="Flash sale product inventory"
            aria-describedby="keyboard-help"
            onKeyDown={handleGridKeyDown}
          >
            <thead>
              <tr role="row">
                {columns.map((column) => {
                  const isSorted =
                    sortKey === column.accessorKey;

                  return (
                    <th
                      key={String(column.accessorKey)}
                      scope="col"
                      role="columnheader"
                      aria-sort={
                        isSorted
                          ? sortDirection === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <button
                        type="button"
                        className="sort-button"
                        onClick={() =>
                          handleSort(column.accessorKey)
                        }
                        aria-label={
                          `Sort by ${column.header}` +
                          (isSorted
                            ? `, currently ${sortDirection}`
                            : "")
                        }
                      >
                        {column.header}
                        <span aria-hidden="true">
                          {isSorted
                            ? sortDirection === "asc"
                              ? " ▲"
                              : " ▼"
                            : " ↕"}
                        </span>
                      </button>
                    </th>
                  );
                })}
                <th scope="col" role="columnheader">
                  Selection
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.map((product, rowIndex) => {
                const isSelected =
                  selectedId === product.id;

                const values: (string | number)[] = [
                  product.id,
                  product.name,
                  product.category,
                  formatPrice(product.price),
                  product.stock,
                ];

                return (
                  <tr
                    key={product.id}
                    role="row"
                    aria-selected={isSelected}
                    className={
                      isSelected ? "selected-row" : ""
                    }
                  >
                    {values.map((value, colIndex) => (
                      <td
                        key={colIndex}
                        role="gridcell"
                        tabIndex={
                          activeCell.row === rowIndex &&
                          activeCell.col === colIndex
                            ? 0
                            : -1
                        }
                        data-row={rowIndex}
                        data-col={colIndex}
                        onFocus={() =>
                          setActiveCell({
                            row: rowIndex,
                            col: colIndex,
                          })
                        }
                        onClick={() =>
                          setActiveCell({
                            row: rowIndex,
                            col: colIndex,
                          })
                        }
                      >
                        {value}
                      </td>
                    ))}

                    <td role="gridcell">
                      <button
                        type="button"
                        className="select-button"
                        aria-pressed={isSelected}
                        aria-label={
                          `${isSelected ? "Deselect" : "Select"} ` +
                          product.name
                        }
                        onClick={() =>
                          selectProduct(product)
                        }
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {visibleProducts.length === 0 && (
                <tr role="row">
                  <td
                    role="gridcell"
                    colSpan={columns.length + 1}
                    className="empty-state"
                  >
                    No products found. Try another search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="pagination"
          aria-label="Product table pagination"
        >
          <p className="muted" aria-live="polite">
            Page {currentPage} of {totalPages}
          </p>

          <div className="pagination-actions">
            <button
              type="button"
              onClick={() =>
                setPage((previous) =>
                  Math.max(1, previous - 1)
                )
              }
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() =>
                setPage((previous) =>
                  Math.min(totalPages, previous + 1)
                )
              }
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              Next
            </button>
          </div>
        </div>

        <div className="selection-summary" aria-live="polite">
          {selectedId === null
            ? "No product selected."
            : `Selected product: ${
                products.find(
                  (product) => product.id === selectedId
                )?.name ?? "Unknown product"
              }`}
        </div>
      </section>

      <footer className="page-footer">
        HW1 · Accessible Product Data-Grid · Demo only
      </footer>
    </main>
  );
}