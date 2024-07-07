// import {
//     ResizableHandle,
//     ResizablePanel,
//     ResizablePanelGroup,
// } from "@/components/ui/resizable"
import SideNav from "@/components/sidenav/sidenav";
import { Raleway } from 'next/font/google';
import Footer from "@/components/footer";

const raleway = Raleway({
    subsets: ['latin'],
})


export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        // <ResizablePanelGroup direction="horizontal">
        //     <ResizablePanel>
        //         <SideNav/>
        //     </ResizablePanel>
        //     <ResizableHandle/>
        //     <ResizablePanel>
        //         {children}
        //     </ResizablePanel>
        // </ResizablePanelGroup>
        <section className={`${raleway.className} w-full`}>
            <SideNav />
            <div className="md:pl-72 2xl:pl-80">
                {children}
                <Footer />
            </div>
        </section>
    )
}