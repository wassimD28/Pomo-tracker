import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";
import { CircleAlert, X } from "lucide-react";

function CompletePomoPanel() {
  const { pomoSession, resetPomoSession } = usePomoStore();
  return (
    <div
      className={cn(
        "group absolute -bottom-full h-full w-4/5 max-sm:w-[95%] rounded-lg bg-white/10 px-8 py-6 backdrop-blur-lg duration-700 ease-custom-ease max-sm:p-4",
        pomoSession.isCompleted && "-bottom-1/3 max-sm:-bottom-20 opacity-100",
      )}
    >
      <Button
        onClick={() => {
          resetPomoSession();
        }}
        className="absolute right-4 top-4 size-7 text-white/50 opacity-0 max-sm:opacity-100 transition-all duration-200 ease-in-out hover:bg-white/10 hover:text-white/90 group-hover:opacity-100"
        variant={"ghost"}
      >
        <X />
      </Button>
      <h1 className="text-4xl font-bold text-custom-white-500">Overview</h1>
      <Table>
        <TableBody>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableCell>Total Focus Duration</TableCell>
            <TableCell>45:15</TableCell>
            <TableCell className="flex items-center justify-end gap-2 text-right">
              this is test <CircleAlert />
            </TableCell>
          </TableRow>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableCell>Session Duration</TableCell>
            <TableCell>01:40:15</TableCell>
            <TableCell className="flex items-center justify-end gap-2 text-right">
              this is test <CircleAlert />
            </TableCell>
          </TableRow>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableCell>Wasted Time</TableCell>
            <TableCell>45:15</TableCell>
            <TableCell className="flex items-center justify-end gap-2 text-right">
              this is test <CircleAlert />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default CompletePomoPanel;
