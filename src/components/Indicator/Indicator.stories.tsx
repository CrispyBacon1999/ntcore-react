import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Indicator, IndicatorProps } from "../index";

export default {
    title: "Indicator",
    component: Indicator,
} as ComponentMeta<typeof Indicator>;

const Template: ComponentStory<typeof Indicator> = (args: IndicatorProps) => (
    <Indicator {...args} />
);

export const Default = Template.bind({});

Default.args = {
    value: false,
};
