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
        accessorKey: "meal_1",
        header: "Meal #1",
    },
    {
        accessorKey: "meal_2",
        header: "Meal #2",
    },
    {
        accessorKey: "meal_3",
        header: "Meal #3",
    },
    {
        accessorKey: "meal_4",
        header: "Meal #4",
    },
    {
        accessorKey: "meal_5",
        header: "Meal #5",
    },
    {
        accessorKey: "meal_register",
        header: "Meal Register"
    }
]