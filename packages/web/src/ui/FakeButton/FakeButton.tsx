import React, { KeyboardEvent, useCallback } from "react";

import { FakeButtonProps } from "./FakeButton.type";

const FakeButton = ({ children, onClick, className }: FakeButtonProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onClick();
      }
    },
    [onClick]
  );

  return (
    <div
      className={className}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      data-testid="fakeButton"
    >
      {children}
    </div>
  );
};

export default React.memo(FakeButton);
