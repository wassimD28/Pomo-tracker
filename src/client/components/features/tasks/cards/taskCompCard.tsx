import { Textarea } from "@/components/ui/textarea";
import { ContentType } from "@/src/shared/types/enum/common.enum";
import { TaskComponent } from "@/src/shared/types/interfaces/taskComp.interface";
import { Check, PenBox, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../ui/button";
import { cn } from "@/src/shared/utils/utils";
import Image from "next/image";
import { useDeleteTaskComp } from "@/src/client/api/mutations/taskComp/useDeleteTaskComp";
import { useUpdateTaskComp } from "@/src/client/api/mutations/taskComp/useUpdateTaskComp";
interface TaskCompCardProps {
  taskComponent: TaskComponent;
}
function TaskCompCard({ taskComponent }: TaskCompCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const contentField = useRef<HTMLTextAreaElement | null>(null);
  const [content, setContent] = useState(taskComponent.content);
  const deleteTaskComp = useDeleteTaskComp();
  const updateTaskComp = useUpdateTaskComp();

  // This function handles the actual height adjustment
  const adjustHeight = () => {
    const textarea = contentField.current;
    if (textarea) {
      // First, reset the height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      // Then set the height to match the content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // This handles user input changes
  const handleInput = () => {
    if (contentField.current) {
      setContent(contentField.current.value);
      adjustHeight();
    }
  };

  // Create a ResizeObserver to watch for width changes
  useEffect(() => {
    const textarea = contentField.current;
    if (!textarea) return;

    // Create a ResizeObserver to monitor width changes
    const resizeObserver = new ResizeObserver(() => {
      // When the width changes, readjust the height
      adjustHeight();
    });

    // Start observing the textarea
    resizeObserver.observe(textarea);

    // Clean up the observer when component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array since we only need to set this up once

  // Adjust height on initial render and when content changes
  useEffect(() => {
    adjustHeight();
  }, [content]); // Dependency on content ensures we adjust when content changes

  if (taskComponent.type === ContentType.text)
    return (
      <div className="group relative flex flex-col items-start gap-1 rounded">
        <Textarea
          disabled={!isEditing}
          value={content}
          ref={contentField}
          className={cn(
            "h-auto min-h-6 w-full resize-none border-0 bg-transparent p-2 text-sm text-custom-white-200/80 disabled:cursor-auto disabled:opacity-70",
            isEditing && "bg-custom-white-200/10",
          )}
          rows={1} // Start with one row
          onInput={handleInput} // Adjust height on input
          placeholder="Type here..."
        />
        {/* oberations buttons  */}
        <div className="flex gap-0.5 opacity-0 duration-300 ease-in-out group-hover:opacity-100">
          {isEditing ? (
            <>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  updateTaskComp.mutate(taskComponent)
                }}
                className="bg-custom-red-300 hover:bg-custom-red-400 h-6 w-6 rounded-md p-0.5 text-custom-white-100/50 hover:bg-custom-white-100/20 hover:text-custom-white-100/80 focus:outline-none"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="bg-custom-red-300 hover:bg-custom-red-400 h-6 w-6 rounded-md p-0.5 text-custom-white-100/50 hover:bg-custom-white-100/20 hover:text-custom-white-100/80 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              {/* edit button  */}
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-custom-red-300 hover:bg-custom-red-400 h-6 w-6 rounded-md p-0.5 text-custom-white-100/50 hover:bg-custom-white-100/20 hover:text-custom-white-100/80 focus:outline-none"
              >
                <PenBox className="h-4 w-4" />
              </Button>
              {/* delete button  */}
              <Button
                onClick={() => {
                  setIsEditing(false);
                  deleteTaskComp.mutate(taskComponent);
                }}
                className="bg-custom-red-300 hover:bg-custom-red-400 h-6 w-6 rounded-md p-0.5 text-custom-white-100/50 hover:bg-custom-white-100/20 hover:text-custom-white-100/80 focus:outline-none"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    );

  if (taskComponent.type === ContentType.image)
    return (
      <div className="flex w-full gap-1 group">
        <div className="w-[80%]">
          <Image
            width={200}
            height={200}
            layout="responsive"
            className="rounded"
            src={taskComponent.content}
            alt={taskComponent.content}
          />
        </div>
        {/* delete button  */}
        <Button
          onClick={() => {
            setIsEditing(false);
            deleteTaskComp.mutate(taskComponent);
          }}
          className="bg-custom-red-300 hover:bg-custom-red-400 h-6 w-6 rounded-md p-0.5 text-custom-white-100/50 hover:bg-custom-white-100/20 hover:text-custom-white-100/80 focus:outline-none opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
}

export default TaskCompCard;
