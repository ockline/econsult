import React from "react";

/**
 * Centered red loader for grid/card layouts (non-table).
 */
const DataLoader = ({ minHeight = "200px" }) => (
	<div className="relative flex items-center justify-center w-full py-12" style={{ minHeight }}>
		<div className="ti-spinner text-danger" role="status" aria-label="loading" style={{ fontSize: "48px" }}>
			<span className="sr-only">Loading...</span>
		</div>
		<span className="absolute inset-0 flex items-center justify-center text-danger font-semibold text-xs uppercase tracking-wider">SOCRATE</span>
	</div>
);

export default DataLoader;
