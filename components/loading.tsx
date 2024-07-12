import Image from "next/image";

export default function Loading({darkbg} : {darkbg?: boolean}) {
    return (
        <div className={`h-screen flex flex-col gap-2 items-center justify-center`}>
                <Image src="/assets/th-text.png" width={3000} height={500} alt="Logo" className="w-3/4 max-w-[400px] animate-bounce mb-2" />
                <p className={`text-2xl font-medium ${darkbg ? 'text-background' : 'text-gray-800'}`}>Loading...</p>
                <p className={`text-base text-center font-medium ${darkbg ? 'text-gray-200' : 'text-gray-600'}`}>Please be patient, don't refresh!</p>
        </div>
    );
}