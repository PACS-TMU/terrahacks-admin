import Link from "next/link";
import Image from "next/image";

export default function SideNav() {
    return (
        <section className={'w-full'}>
            <Link href="/" className={'flex text-center w-full'}>
                <Image src={'/th-logo.png'} alt={'TerraHacks Logo'} width={50} height={50}/>
                TerraHacks Admin
            </Link>
        </section>
    )
}