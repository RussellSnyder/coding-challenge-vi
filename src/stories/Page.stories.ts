import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { Page } from "./Page";

const meta = {
  title: "Example/Page",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole("button", { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(loginButton).not.toBeInTheDocument();

    const logoutButton = canvas.getByRole("button", { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};

export const WithModalOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /Show me/i });

    await expect(openButton).toBeInTheDocument();
    await userEvent.click(openButton);

    const dialog = canvas.getByRole("dialog");
    await expect(dialog).toBeInTheDocument();
  },
};

export const ModalOpensAndCloses: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let dialog: HTMLElement;

    dialog = await openDialog(canvas);
    const closeButton = canvas.getByRole("button", { name: /Close/i });
    await userEvent.click(closeButton);
    await expect(dialog).not.toBeInTheDocument();

    dialog = await openDialog(canvas);
    const cancelButton = canvas.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);
    await expect(dialog).not.toBeInTheDocument();

    dialog = await openDialog(canvas);
    const backdrop = canvas.getByTestId("modal-backdrop");
    await userEvent.click(backdrop);
    await expect(dialog).not.toBeInTheDocument();
  },
};

type Canvas = ReturnType<typeof within>;

const openDialog = async (canvas: Canvas): Promise<HTMLElement> => {
  const openButton = canvas.getByRole("button", { name: /Show me/i });

  await expect(openButton).toBeInTheDocument();
  await userEvent.click(openButton);

  return canvas.getByRole("dialog");
};
