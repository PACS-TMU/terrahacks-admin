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

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

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

    return (
        <div className="rounded-md border">
            <Table>
                {/* <TableCaption>A list of all applicants</TableCaption> */}
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
                            <TableCell>{row.original.applied_date}</TableCell>
                            <TableCell>{row.original.status}</TableCell>
                            <TableCell>
                                <Link
                                    href={`/dashboard/applications/${row.original.account_id}`}
                                    target="_blank"
                                    className="text-sky-600 underline hover:text-fuchsia-600 ease-in-out duration-300"
                                >
                                    Review Here
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 px-4 mx-4">
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
        </div>
    )
}
