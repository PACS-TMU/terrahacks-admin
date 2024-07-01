"use client";

import {useFormStatus} from "react-dom";
import {type ComponentProps} from "react";

import {Button} from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = ComponentProps<"button"> & {
    pendingText?: string;
};

export function SubmitButton({children, pendingText, ref, ...props}: Props) {
    const {pending, action} = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
        <Button {...props} type="submit" aria-disabled={pending} disabled={pending} aria-label="Submit Button">
            {isPending && <AiOutlineLoading3Quarters className={'mr-2 animate-spin'}/>}
            {isPending ? pendingText : children}
        </Button>
    );
}