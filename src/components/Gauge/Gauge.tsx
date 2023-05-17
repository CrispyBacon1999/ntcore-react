import React from "react";

export type GaugeProps = {
    value: number;
    min?: number;
    max?: number;
    label?: string;
    width?: number;
    showValue?: boolean;
};

/**
 * Gauge component used for displaying a value as a range
 *
 * ---
 *
 * Styling is done using CSS variables:
 *
 * --team-primary-color: The color of the gauge when filled
 *
 * --team-secondary-neutral-color: The color of the gauge when empty
 */
export function Gauge({
    width = 100,
    value,
    min = 0,
    max = 100,
    label = "",
    showValue = false,
}: GaugeProps) {
    const strokeWidth = width / 10;
    const innerRadius = width / 2 - strokeWidth / 2;
    const circumference = innerRadius * 2 * Math.PI;
    const arc = circumference * (270 / 360);
    const dashArray = `${arc} ${circumference}`;
    const transform = `rotate(135, ${width / 2}, ${width / 2})`;
    const percent = (value - min) / (max - min);
    const percentNormalized = Math.min(Math.max(percent, 0), 100);
    const offset = arc - percentNormalized * arc;

    return (
        <svg width={width} height={width}>
            <circle
                className="gauge_base"
                cx={width / 2}
                cy={width / 2}
                fill="transparent"
                r={innerRadius}
                stroke="var(--team-secondary-neutral-color)"
                strokeWidth={width / 10}
                strokeDasharray={dashArray}
                transform={transform}
                strokeLinecap="round"
            />
            <circle
                className="gauge_base"
                cx={width / 2}
                cy={width / 2}
                fill="transparent"
                r={innerRadius}
                stroke="var(--team-primary-color)"
                strokeWidth={width / 10}
                strokeDasharray={dashArray}
                transform={transform}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                    transition: "stroke-dashoffset 0.5s",
                }}
            />
            <text
                x={width / 2}
                y={width / 2 + (label.length === 0 ? width / 10 : 0)}
                textAnchor="middle"
                fontSize={width / 4}
            >
                {showValue ? value : ""}
            </text>
            <text
                x={width / 2}
                y={width / 2 + (showValue ? width / 5 : 0)}
                textAnchor="middle"
            >
                {label}
            </text>
        </svg>
    );
}
