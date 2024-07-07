"use client"

import Link from "next/link" 

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {

  const dataTable = useMemo(() => data, []);
  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
            {/* <TableCaption>A list of all applicants</TableCaption> */}
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
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
            {data?.map((application: any) => (
                <TableRow key={application.application_id}>
                    <TableCell>
                        {
                            application.applicant_details?.first_name + " " + application.applicant_details?.last_name  || "N/A"
                        }
                    </TableCell>
                    <TableCell>{application.applicant_details?.email}</TableCell>
                    <TableCell>{application.applied_date}</TableCell>
                    <TableCell>{application.status}</TableCell>
                    <TableCell>
                        <Link 
                            href={`/dashboard/applications/${application.account_id}`} 
                            target="_blank" 
                            className="text-sky-600 underline hover:text-fuchsia-600 ease-in-out duration-300"
                        >
                            Review Here
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableBody>
                {/* {table.getRowModel()?.rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    // data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )} */}
            </TableBody>
        </Table>
    </div>
  )
}
