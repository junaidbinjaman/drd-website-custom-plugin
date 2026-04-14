Before writing any code, read and follow the instruction in the files bellow
- /docs/plugin-structure.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### React UI (from `react-ui/` directory)

```bash
npm run dev      # Vite dev server with HMR
npm run build    # TypeScript compile + Vite production build
npm run watch    # Watch mode (rebuilds on change)
npm run lint     # ESLint
```

Build output goes to `includes/react/` (`index.js`, `index.css`, `index.html`) — these are the files WordPress enqueues.

No PHP test suite is configured.

## Architecture

### Plugin Bootstrap Flow

`drd-custom-plugin.php` → `Drd_Custom_Plugin` (singleton) → registers hooks via `Drd_Custom_Plugin_Loader` → runs on `plugins_loaded`.

The loader class (`includes/class-drd-custom-plugin-loader.php`) collects all WordPress action/filter registrations and fires them together during `run()`.

### PHP Layer

| Class | File | Role |
|---|---|---|
| `Drd_Custom_Plugin` | `includes/class-drd-custom-plugin.php` | Orchestrates init, loads all dependencies |
| `Drd_Custom_Plugin_Admin` | `admin/class-drd-custom-plugin-admin.php` | Enqueues admin assets, registers admin menu, wires REST controllers |
| `Retail_Sales_Report` | `includes/rest_controllers/Retail_Sales_Report.php` | REST endpoint for retail (customer role + guests) |
| `Wholesale_Sales_Report` | `includes/rest_controllers/Wholesale_Sales_Report.php` | REST endpoint for wholesale (subscriber/wholesale_customer roles) |

REST API namespace: `drdcustomplugin/v1`
Endpoints: `GET /retail-sales-report`, `GET /wholesale-sales-report`
Both accept `start_date` / `end_date` query params and use `wc_get_orders()` under the hood.

The admin page mount point is `<div id="drd-admin-interface"></div>`, rendered by `Drd_Custom_Plugin_Admin::salse_report_by_user_role()`. Admin assets are conditionally enqueued only on that page.

### React UI Layer (`react-ui/src/`)

**Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Query, Recharts, Radix UI.

**Data flow:**
`src/api/` fetchers → `src/hooks/` (TanStack Query wrappers) → components

**State:** `SalesReportDateProvider` (React Context) manages the selected date range globally.

**Key components:**
- `RetailSalesReport.tsx` / `WholesaleSalesReport.tsx` — main report views
- `salseByUserRoleChart.tsx` — Recharts visualization
- `DateRangePicker.tsx` + quick-select buttons (`LastMonthButton`, `YearToDateButton`, `MonthToDate`) — filter controls
- `src/components/ui/` — Radix-based primitives (Button, Card, Dialog, Popover, Select, Calendar)

The React app communicates with WordPress via the REST API using a nonce for authentication (passed from PHP via `wp_localize_script`).

## Key Constants

Defined in `drd-custom-plugin.php`:
- `DRD_CUSTOM_PLUGIN_VERSION`
- `DRD_CUSTOM_PLUGIN_REST_API_NAMESPACE` → `"drdcustomplugin"`

## WooCommerce Dependency

The plugin requires WooCommerce. An admin notice is shown (and the plugin halts) if WooCommerce is not active. Always test against a WooCommerce-enabled environment.