"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useMemo, useState } from "react";
import { format } from 'date-fns';

interface ApplicantDetails {
    first_name: string;
    last_name: string;
    email: string;
}

interface Meal {
    meal_no: string;
    meal_taken: string;
    meal_time: string;
}

interface Application {
    meals: Meal[];
    applicant_details: ApplicantDetails;
    account_id: string;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends Application, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    const dataTable = useMemo(() => data, [data]);

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 });

    const table = useReactTable({
        data: dataTable,
        columns,
        pageCount: Math.ceil(dataTable.length / pagination.pageSize),
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const [pageInput, setPageInput] = useState(table.getState().pagination.pageIndex + 1);

    const handlePageChange = () => {
        const pageIndex = pageInput - 1;
        if (pageIndex >= 0 && pageIndex < table.getPageCount()) {
            table.setPageIndex(pageIndex);
        } else {
            setPageInput(table.getState().pagination.pageIndex + 1);
        }
    };

    // Need to sort meals array based on the meal number to ensure proper rendering
    const sortedRows = table.getRowModel().rows.map(row => {
        row.original.meals.sort((a, b) => parseInt(a.meal_no, 10) - parseInt(b.meal_no, 10));
        return row;
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="font-semibold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {sortedRows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {
                                    row.original.applicant_details?.first_name + " " + row.original.applicant_details?.last_name || "N/A"
                                }
                            </TableCell>
                            <TableCell>{row.original.applicant_details?.email}</TableCell>
                            <TableCell>
                                {
                                    String(row.original.meals[0].meal_taken).toUpperCase() === "TRUE" ? "Yes" : "No"
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    String(row.original.meals[1].meal_taken).toUpperCase() === "TRUE" ? "Yes" : "No"
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    String(row.original.meals[2].meal_taken).toUpperCase() === "TRUE" ? "Yes" : "No"
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    String(row.original.meals[3].meal_taken).toUpperCase() === "TRUE" ? "Yes" : "No"
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    String(row.original.meals[4].meal_taken).toUpperCase() === "TRUE" ? "Yes" : "No"
                                }
                            </TableCell>
                            <TableCell>
                                <Link
                                    aria-label="Meal Register Here"
                                    href={`/dashboard/log/${row.original.account_id}`}
                                    rel="noopener noreferrer"
                                    className="text-sky-600 underline hover:text-fuchsia-600 ease-in-out duration-300"
                                >
                                    Meal Register Here
                                </Link>
                            </TableCell> 
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex flex-col md:flex-row items-center justify-between space-x-4 py-4">
                <div className="flex items-center space-x-1 px-4">
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>

                <div className="px-4 flex flex-col">
                    <div className="space-x-1">
                        <span>
                            Enter Page Number:
                        </span>
                        <input
                            type="number"
                            value={pageInput}
                            name="pageInput"
                            onChange={(e) => setPageInput(Number(e.target.value))}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handlePageChange();
                                }
                            }}
                            className="w-16 p-1 text-center border rounded"
                            min={1}
                            max={table.getPageCount()}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePageChange}
                        >
                            Go
                        </Button>
                    </div>
                    <div className="py-1 lg:text-xs xl:text-sm text-gray-400">
                        Showing entries {pagination.pageIndex * pagination.pageSize + 1} - {Math.min((pagination.pageIndex + 1) * pagination.pageSize, dataTable.length)} of {dataTable.length} entries
                    </div>
                </div>
            </div>
        </div>
    )
}
