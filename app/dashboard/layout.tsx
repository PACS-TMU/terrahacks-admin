import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import SideNav from "@/components/sidenav";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (

        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <SideNav/>
            </ResizablePanel>
            <ResizableHandle/>
            <ResizablePanel>
                {children}
            </ResizablePanel>
        </ResizablePanelGroup>

    )
}