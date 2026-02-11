import React from "react";

/**
 * Reusable table/data loader - red spinner centered in container.
 * Use inside table tbody as a single row, or in any data container.
 */
const TableLoader = ({ colSpan = 1, minHeight = "200px" }) => (
	<tr>
		<td colSpan={colSpan} className="text-center align-middle" style={{ minHeight, verticalAlign: "middle" }}>
			<div className="relative flex items-center justify-center w-full py-12">
				<div className="ti-spinner text-danger" role="status" aria-label="loading" style={{ fontSize: "48px" }}>
					<span className="sr-only">Loading...</span>
				</div>
				<span className="absolute inset-0 flex items-center justify-center text-danger font-semibold text-xs uppercase tracking-wider">SOCRATE</span>
			</div>
		</td>
	</tr>
);

export default TableLoader;
