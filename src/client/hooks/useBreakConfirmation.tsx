import { usePomoStore } from "@/src/client/store/usePomoStore";
import { useToast } from "./use-toast";
import { Button } from "../components/ui/button";

export const useBreakConfirmation = () => {
  const { toast } = useToast();
  const { startBreakSession } = usePomoStore();

  const showBreakConfirmation = () => {
    toast({
      title: "Focus Session Complete",
      description: "Would you like to start a break?",
      duration: Infinity,
      action: (
        <div className="flex gap-2">
          <Button
            className="bg-custom-white-500 hover:bg-custom-white-200 text-amber-950"
            size="sm"
            onClick={() => {
              startBreakSession(false); // Short break
              toast({ title: "Short Break Started" });
            }}
          >
            Short Break (5 min)
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              startBreakSession(true); // Long break
              toast({ title: "Long Break Started" });
            }}
          >
            Long Break (15 min)
          </Button>
        </div>
      ),
    });
  };

  return { showBreakConfirmation };
};
