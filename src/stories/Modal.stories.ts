import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { Modal } from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Modal Title",
    body: "Modal body content",
    onClose: fn(),
    confirmationLabel: "action",
    onConfirmation: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

type Canvas = ReturnType<typeof within>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    checkButton(canvas, "close", args.onClose);
    checkButton(canvas, "cancel", args.onClose);
    checkButton(canvas, "confirmation", args.onConfirmation);
  },
};

const checkButton = async (
  canvas: Canvas,
  label: string,
  action: () => void
) => {
  const button = canvas.getByLabelText(label);
  await expect(button).toBeInTheDocument();
  await userEvent.click(button);
  await expect(action).toHaveBeenCalled();
};
