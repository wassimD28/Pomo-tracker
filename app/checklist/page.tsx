"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Categories from "./_components/categories";


export default function NotePage() {
  return (
    <div className="relative flex h-svh w-full flex-row items-center justify-center overflow-hidden bg-custom-black-500 pl-16 text-custom-white-300 py-4 pr-4">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={200}>
         <Categories/>
        </ResizablePanel>
        <ResizableHandle className="opacity-0"/>
        <ResizablePanel>
          <div className="p-8 bg-custom-white-300/20 rounded-lg">
            <h1>Note 2</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non quam felis. Nulla facilisi. Sed auctor, velit id fermentum finibus, turpis nisi fermentum massa, vitae fermentum ligula neque vel mauris. Sed vel nisi vel enim fermentum auctor. Donec id velit non libero tristique semper. Sed auctor, velit id fermentum finibus, turpis nisi fermentum massa, vitae fermentum ligula neque vel mauris. Sed vel nisi vel enim fermentum auctor. Donec id velit non libero tristique semper.</p>
            
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
