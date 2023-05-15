import React from "react";

export type IndicatorProps = {
    value: boolean;
    children?: React.ReactNode;
};

/**
 * Basic indicator component that represents a boolean value.
 *
 * ---
 *
 * Styling is done using CSS variables:
 *
 * --team-primary-color: The color of the indicator when on
 *
 * --team-secondary-neutral-color: The color of the indicator when off
 */
export function Indicator({ value, children = null }: IndicatorProps) {
    const className = value
        ? "indicator indicator--on"
        : "indicator indicator--off";
    return <div className={className}>{children}</div>;
}
