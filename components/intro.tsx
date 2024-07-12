import Link from "next/link";

export default function Intro({header, description} : {header: string, description: string}) {
    return (
        <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
            <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">{header}</h1>
            <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">{description}</p>
            <p className="text-gray-800 mt-2">Having trouble? Please contact us at through {" "}
                <a
                    aria-label="Send us an email"
                    href="mailto:contact@terrahacks.ca"
                    target="_blank"
                    rel="nooppener noreferrer"
                    className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                >
                    Email
                </a>
                {" "} or get help in our support channels on {" "}
                <a
                    aria-label="Join our Discord server"
                    href="https://discord.gg/982AkBQea7"
                    target="_blank"
                    rel="nooppener noreferrer"
                    className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                >
                    Discord
                </a>.
            </p>
        </div>
    );
}