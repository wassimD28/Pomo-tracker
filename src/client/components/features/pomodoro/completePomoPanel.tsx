import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn, formatTime } from "@/src/shared/utils/utils";
import { X } from "lucide-react";
import CompletePanelNotice from "./completePanelNotice";

function CompletePomoPanel() {
  const { pomoSession, resetPomoSession } = usePomoStore();
  return (
    <div
      className={cn(
        "group absolute -bottom-full h-full w-4/5 rounded-lg bg-white/10 px-8 py-6 backdrop-blur-lg duration-700 ease-custom-ease max-sm:w-[95%] max-sm:p-4",
        pomoSession.isCompleted && "-bottom-1/3 opacity-100 max-sm:-bottom-20",
      )}
    >
      <Button
        onClick={() => {
          resetPomoSession();
        }}
        className="absolute right-4 top-4 size-7 text-white/50 opacity-0 transition-all duration-200 ease-in-out hover:bg-white/10 hover:text-white/90 group-hover:opacity-100 max-sm:opacity-100 2xl:scale-150"
        variant={"ghost"}
      >
        <X />
      </Button>
      <h1 className="text-4xl font-bold text-custom-white-500 2xl:text-5xl 2xl:mb-4">Overview</h1>
      <Table>
        <TableBody className="max-sm:text-xs 2xl:text-xl">
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableCell>Total Session Duration</TableCell>
            <TableCell>
              {formatTime(pomoSession.totalSessionDuration)}
            </TableCell>
            <TableCell className="flex justify-end">
              <CompletePanelNotice noticeFor="total_session_duration" />
            </TableCell>
          </TableRow>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableCell>Total Focus Duration</TableCell>
            <TableCell>{formatTime(pomoSession.totalFocusDuration)}</TableCell>
            <TableCell className="flex justify-end">
              <CompletePanelNotice noticeFor="total_focus_duration" />
            </TableCell>
          </TableRow>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableCell>Total Break Duration</TableCell>
            <TableCell>{formatTime(pomoSession.totalBreakDuration)}</TableCell>
            <TableCell className="flex justify-end">
              <CompletePanelNotice noticeFor="total_break_duration" />
            </TableCell>
          </TableRow>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableCell>Wasted Time</TableCell>
            <TableCell>{formatTime(pomoSession.wastedTime)}</TableCell>
            <TableCell className="flex justify-end">
              <CompletePanelNotice noticeFor="wasted_time" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default CompletePomoPanel;
