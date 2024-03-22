import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "./Button";
import "./modal.css";

interface Props {
  title: string;
  body: string | React.ReactNode;
  onClose: () => void;
  onConfirmation: () => void;
  confirmationLabel: string;
  containerStyles?: React.CSSProperties;
  onCloseLabel?: string;
}

export const Modal = ({
  title,
  body,
  onClose,
  containerStyles,
  onCloseLabel,
  onConfirmation,
  confirmationLabel,
}: Props) => {
  const ref = useRef(null);
  useOnClickOutside(ref, onClose);

  return (
    <div className="modal">
      <div data-testid="modal-backdrop">
        <dialog ref={ref} open style={{ ...containerStyles }}>
          <div>
            <h3>{title}</h3>
            <Button
              size="small"
              aria-label="close"
              onClick={onClose}
              label={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 44 44"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M0.549989 4.44999L4.44999 0.549988L43.45 39.55L39.55 43.45L0.549989 4.44999Z" />
                  <path d="M39.55 0.549988L43.45 4.44999L4.44999 43.45L0.549988 39.55L39.55 0.549988Z" />
                </svg>
              }
            />
          </div>
          <div>{body}</div>
          <div>
            <Button
              aria-label="cancel"
              onClick={onClose}
              label={onCloseLabel ?? "cancel"}
            />
            <Button
              primary
              aria-label="confirmation"
              onClick={onConfirmation}
              label={confirmationLabel}
            />
          </div>
        </dialog>
      </div>
    </div>
  );
};
