"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Categories from "./_components/categories";
import Tasks from "./_components/tasks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



export default function NotePage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex h-svh w-full flex-row items-center justify-center overflow-hidden bg-custom-black-500 py-4 pl-16 pr-4 text-custom-white-300">
        {/* blured circle  */}
        <div className="absolute -right-1/4 -top-1/4 aspect-square w-[700px] rounded-full bg-custom-tomato-500 opacity-30 blur-[200px]" />
        <ResizablePanelGroup
          direction="horizontal"
          className="z-40 h-full w-full"
        >
          <ResizablePanel defaultSize={20}>
            <Categories />
          </ResizablePanel>
          <ResizableHandle className="w-2 opacity-0" />
          <ResizablePanel defaultSize={30}>
            <Tasks />
          </ResizablePanel>
          <ResizableHandle className="w-2 opacity-0" />
          <ResizablePanel defaultSize={50}>
            <Tasks />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </QueryClientProvider>
  );
}
