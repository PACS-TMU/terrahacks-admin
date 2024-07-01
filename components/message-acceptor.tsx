'use client';
import {useEffect} from "react";
import {useSearchParams, useRouter} from "next/navigation";

import {useToast} from "@/components/ui/use-toast"

export default function MessageAcceptor() {

    const {toast} = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {

        searchParams.has('message') && toast({
            description: searchParams.get('message')
        });

        searchParams.has('error') && toast({
            title: "Error",
            description: searchParams.get('error'),
            variant: 'destructive'
        });

        router.replace('/login')

    }, [searchParams]);

    return null;
}
