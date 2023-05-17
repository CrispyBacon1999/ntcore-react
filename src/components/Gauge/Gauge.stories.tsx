import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Gauge, GaugeProps } from "../index";

export default {
    title: "Gauge",
    component: Gauge,
} as ComponentMeta<typeof Gauge>;

const Template: ComponentStory<typeof Gauge> = (args: GaugeProps) => (
    <Gauge {...args} />
);

export const Default = Template.bind({});

Default.args = {
    value: 50,
};
