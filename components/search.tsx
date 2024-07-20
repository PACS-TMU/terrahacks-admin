'use client';

import { IoIosSearch } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSearch(formData: FormData) {
        setIsSubmitting(true);
        const searchValue = formData.get('search');
        const searchType = formData.get('searchType');
        if (searchValue) {
            const params = new URLSearchParams();
            params.set(searchType as string, searchValue.toString());
            router.push(`${window.location.pathname}?${params}`);
        }
        setTimeout(() => { setIsSubmitting(false); }, 1000);
    }

    return (
        <form
            id="search-form"
            action={handleSearch}
            className="relative flex flex-col items-center w-11/12 md:w-3/4 lg:w-1/2 mx-auto"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch(new FormData(e.currentTarget));
            }}
        >
            <p className="mt-6">Search By:</p>
            <div className="w-full flex justify-around mt-4">
                <div>
                    <input
                        type="radio"
                        id="firstName"
                        name="searchType"
                        value="firstName"
                        defaultChecked
                        className="peer hidden"
                    />
                    <label
                        htmlFor="firstName"
                        className="inline-block p-2 cursor-pointer text-sm text-gray-500 peer-checked:text-gray-900 peer-checked:shadow-md peer-checked:border-gray-700 border border-gray-200 rounded-md"
                    >
                        First Name
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="lastName"
                        name="searchType"
                        value="lastName"
                        className="peer hidden"
                    />
                    <label
                        htmlFor="lastName"
                        className="inline-block p-2 cursor-pointer text-sm text-gray-500 peer-checked:text-gray-900 peer-checked:shadow-md peer-checked:border-gray-700 border border-gray-200 rounded-md"
                    >
                        Last Name
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="email"
                        name="searchType"
                        value="email"
                        className="peer hidden"
                    />
                    <label
                        htmlFor="email"
                        className="inline-block p-2 cursor-pointer text-sm text-gray-500 peer-checked:text-gray-900 peer-checked:shadow-md peer-checked:border-gray-700 border border-gray-200 rounded-md"
                    >
                        Email
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="status"
                        name="searchType"
                        value="status"
                        className="peer hidden"
                    />
                    <label
                        htmlFor="status"
                        className="inline-block p-2 cursor-pointer text-sm text-gray-500 peer-checked:text-gray-900 peer-checked:shadow-md peer-checked:border-gray-700 border border-gray-200 rounded-md"
                    >
                        Status
                    </label>
                </div>
            </div>
            <div className="relative w-full mt-6">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    type="search"
                    id="search"
                    name="search"
                    className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                    placeholder={placeholder}
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    className="absolute top-[50%] right-[3.5%] text-gray-500 peer-focus:text-gray-900 transform -translate-y-1/2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <AiOutlineLoading3Quarters className={'mr-2 animate-spin'}/> : <IoIosSearch size={20} />}
                </button>
            </div>
        </form>
    );
}
