"use client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "applied_at",
        header: "Applied at",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "review_application",
        header: "Review Application",
    }
]