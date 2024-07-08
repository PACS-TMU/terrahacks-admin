"use client";
import { useEffect, useState, useRef, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import NavSignoutButton from "@/components/sidenav/nav-signout";
import Loading from "@/components/loading";
import { IoHomeOutline, IoDocumentsOutline, IoLockClosedOutline } from 'react-icons/io5';
import { Twirl as Hamburger } from 'hamburger-react';
import { useClickAway } from "react-use";
import { navItems } from "./navitems";
import { createClient } from "@/utils/supabase/client";

const iconMapping: Record<string, ReactNode> = {
    "<IoHomeOutline />": <IoHomeOutline size={28} />,
    "<IoDocumentsOutline />": <IoDocumentsOutline size={28} />,
};

export default function Sidenav() {
    const [isExpandedMobile, setIsExpandedMobile] = useState(false);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setIsExpandedMobile(false);
        document.body.style.overflow = 'auto';
    });

    const handleClick = () => {
        setIsExpandedMobile(!isExpandedMobile);
        document.body.style.overflow = isExpandedMobile ? 'auto' : 'hidden';
    }


    return (
        <>
            {/* Navbar for medium+ screens */}
            <nav className="h-screen p-4 bg-highlightLight text-background transition-all duration-300 gap-12 flex-col w-[60px] font-medium hidden md:block md:fixed md:inset-y-0 md:z-10 md:w-72 2xl:w-80 border-r-2 border-r-gray-300 2xl:text-lg">
                {!navItems ? <Loading darkbg /> : (
                    <>
                        <div className="flex items-start justify-center p-4">
                            <a aria-label="TerraHacks Home" href="https://terrahacks.ca/" target="_blank" className="flex flex-col gap-4 items-center justify-center">
                                <Image
                                    src="/assets/th-text.png"
                                    alt="Terrahacks text logo"
                                    width={3000}
                                    height={500}
                                    className="w-full h-auto"
                                    blurDataURL="/assets/th-text.png"
                                    placeholder="blur"
                                />
                            </a>
                        </div>

                        <hr className="border-t-2 border-t-gray-300 w-full" />

                        <div className="p-4">
                            Welcome,
                            <span className="ml-1 font-bold"> Admin</span>
                            !
                        </div>

                        <aside className="flex flex-col items-start justify-between h-[83%] overflow-y-auto">
                            <ul className="flex flex-col gap-2 w-full">
                                {navItems.map((item) => (
                                    <Link key={item.id} aria-label={`Path to ${item.name}`} href={item.path} className={`w-full`} rel="noopener noreferrer">
                                        <li className={`p-4 hover:bg-background duration-300 ease-in-out rounded-md w-full hover:text-foreground cursor-pointer flex items-center justify-start gap-2`}>
                                            {iconMapping[item.icon]}
                                            {item.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                            <NavSignoutButton />
                        </aside>
                    </>
                )}
            </nav>
            {/* Navbar for small (mobile) screens */}
            <nav className="flex items-center justify-between p-4 text-background border-b-2 border-b-gray-300 bg-highlightLight md:hidden">
                <div className="flex items-center justify-start">
                    <a aria-label="TerraHacks Home" href="https://terrahacks.ca/" target="_blank" className="flex gap-2 items-center z-10">
                        <Image
                            src="/assets/th-logo-white.png"
                            alt="Terrahacks logo"
                            width={500}
                            height={500}
                            className="w-12 h-12"
                            priority={true}
                        />
                    </a>
                </div>
                <button 
                    onClick={handleClick}
                    aria-label="Show navigation menu"
                >
                    <Hamburger toggled={isExpandedMobile} toggle={setIsExpandedMobile} size={24} />
                </button>
            </nav>
            <div ref={ref} className={`fixed md:hidden z-20 right-0 top-0 h-full max-w-full px-6 py-14 border-l border-l-gray-300 bg-highlightLight text-background backdrop-blur-xl transition-all duration-300 ease-in-out ${!isExpandedMobile ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                <button 
                    onClick={handleClick}
                    aria-label="Show navigation menu"
                    className="absolute top-2 right-2 z-30"
                >
                    <Hamburger toggled={isExpandedMobile} toggle={setIsExpandedMobile} size={24} />
                </button>
                <div className="flex flex-col items-start justify-between h-[90%]">
                    <ul className="flex flex-col w-full divide-y divide-gray-300">
                        {navItems.map((item) => (
                            <Link key={item.id} aria-label={`Path to ${item.name}`} href={item.path} className={`w-full`} rel="noopener noreferrer">
                                <li className={`p-4 hover:bg-background duration-300 ease-in-out rounded-md w-full hover:text-foreground cursor-pointer flex items-center justify-start gap-2`}>
                                    {iconMapping[item.icon]}
                                    {item.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <NavSignoutButton />
                </div>
            </div>
        </>
    );
}
