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

interface Application {
    application_id: string;
    applicant_details: ApplicantDetails;
    applied_date: string;
    status: string;
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
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {
                                    row.original.applicant_details?.first_name + " " + row.original.applicant_details?.last_name || "N/A"
                                }
                            </TableCell>
                            <TableCell>{row.original.applicant_details?.email}</TableCell>
                            <TableCell>{format((row.original.applied_date), 'PPpp')}</TableCell>
                            <TableCell>{row.original.status}</TableCell>
                            <TableCell>
                                <Link
                                    aria-label="Review Application"
                                    href={`/dashboard/applications/${row.original.account_id}`}
                                    rel="noopener noreferrer"
                                    className="text-sky-600 underline hover:text-fuchsia-600 ease-in-out duration-300"
                                >
                                    Review Here
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
