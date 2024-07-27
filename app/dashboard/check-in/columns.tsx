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
        accessorKey: "checked_in",
        header: "Checked In?",
    },
    {
        accessorKey: "timestamp",
        header: "Timestamp",
    },
    {
        accessorKey: "organizer",
        header: "Organizer",
    },
    {
        accessorKey: "check_in_user",
        header: "Check-In User"
    }
]