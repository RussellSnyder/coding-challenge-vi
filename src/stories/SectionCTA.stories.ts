import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { SectionCTA } from "./SectionCTA";

const meta = {
  title: "Page Sections/CTA",
  component: SectionCTA,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    title: "This is a title",
    image: {
      src: "https://source.unsplash.com/random/800x600",
      alt: "great description here",
    },
    description:
      "Conversational content cta back to the drawing-board, so flesh that out message the initiative. Deploy to production this vendor is incompetent",
    buttonLabel: "Show Me",
    onButtonClick: fn(),
  },
} satisfies Meta<typeof SectionCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const ctaButton = canvas.getByRole("button");
    await expect(ctaButton).toBeInTheDocument();
    await userEvent.click(ctaButton);
    await expect(args.onButtonClick).toHaveBeenCalled();
  },
};
