import { toTimeWithLetters } from "@/src/shared/utils/utils";

interface FocusPercentageItemProps {
  categoryName: string;
  focusPercentage: number;
  duration: number;
}
function FocusPercentageItem({
  categoryName,
  focusPercentage,
  duration,
}: FocusPercentageItemProps) {
  console.log(
    "focusPercentage :",
    focusPercentage,
    "categoryName :",
    categoryName,
  );

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-4 w-44 items-end rounded-full bg-custom-tomato-700">
        <div
          style={{ width: `${focusPercentage}%` }}
          className="flex h-full items-center rounded-full bg-custom-tomato-500 relative"
        >
          <h5 className="text-xs text-custom-white-500/50 left-2 absolute w-12  ">
            {toTimeWithLetters(duration)}
          </h5>
        </div>
      </div>
      <h1 className="text-xs opacity-75 first-letter:uppercase">
        {categoryName}
      </h1>
    </div>
  );
}

export default FocusPercentageItem;
