"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/client/components/ui/resizable";
import Categories from "../../../src/client/components/features/tasks/categories";
import Tasks from "../../../src/client/components/features/tasks/tasks";
import TaskComponents from "../../../src/client/components/features/tasks/taskComponents";
import { useIsMobile } from "@/src/client/hooks/use-mobile";

export default function TaskPage() {
  const isMobile = useIsMobile()

  if (isMobile){
    return (
      <div className="relative flex h-svh w-svh items-center justify-center bg-custom-black-500 p-4 text-custom-white-300 pointer-events-auto">
        {/* blured circle  */}
        <div className="absolute z-0 -right-1/4 -top-1/4 aspect-square w-[700px] rounded-full bg-custom-tomato-500 opacity-30 blur-[200px]" />
          <div className="w-full h-full flex flex-col gap-2 overflow-y-scroll z-10">
            <Categories />
            <Tasks />
            <TaskComponents />
          </div>
      </div>
    )
  }
  return (
    
      <div className="relative pointer-events-auto flex h-svh w-full flex-row items-center justify-center overflow-hidden bg-custom-black-500 py-4 pl-16 pr-4 text-custom-white-300">
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
            <TaskComponents />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
   
  );
}
