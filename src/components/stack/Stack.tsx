import { FC, forwardRef, HTMLAttributes } from "react";
import { cn } from "../../utils/utils";

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  col?: boolean;
  spacing?: number;
}

export const Stack: FC<StackProps> = forwardRef<HTMLDivElement, StackProps>(
  ({ children, className, col, spacing }) => {
    return (
      <div
        className={cn(
          "flex gap-4 flex-wrap",
          col && "flex-col",
          spacing && `gap-${spacing}`,
          className
        )}
      >
        {children}
      </div>
    );
  }
);
