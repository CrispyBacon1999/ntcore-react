import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Guage, GuageProps } from "../index";

export default {
    title: "Guage",
    component: Guage,
} as ComponentMeta<typeof Guage>;

const Template: ComponentStory<typeof Guage> = (args: GuageProps) => (
    <Guage {...args} />
);

export const Default = Template.bind({});

Default.args = {
    value: 50,
};
