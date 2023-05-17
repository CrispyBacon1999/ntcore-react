import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Field2d, Field2dProps } from "../index";

import { Year } from "../../lib/util/Year";

export default {
    title: "Field2d",
    component: Field2d,
} as ComponentMeta<typeof Field2d>;

const Template: ComponentStory<typeof Field2d> = (args: Field2dProps) => (
    <Field2d {...args} />
);

function computeSplinePoints() {
    const start = [2.1, 4.4, 180];
    const end = [7.1, 4.4, 180];
    const controlPoints = [
        [3.1, 5, 180],
        [5.1, 5, 180],
    ];

    const splinePoints: number[] = [];

    const spline = new Spline(start, end, controlPoints);

    const n = 50;
    for (let i = 0; i < n; i++) {
        const t = i / n;
        const point = spline.getPoint(t);
        splinePoints.push(point[0], point[1], point[2]);
    }

    return splinePoints;
}

class Spline {
    start: number[];
    end: number[];
    controlPoints: number[][];
    constructor(start: number[], end: number[], controlPoints: number[][]) {
        this.start = start;
        this.end = end;
        this.controlPoints = controlPoints;
    }

    getPoint(t: number) {
        const x = this.getX(t);
        const y = this.getY(t);
        const rotation = this.getRotation(t);
        return [x, y, rotation];
    }

    getX(t: number) {
        const x =
            Math.pow(1 - t, 3) * this.start[0] +
            3 * Math.pow(1 - t, 2) * t * this.controlPoints[0][0] +
            3 * (1 - t) * Math.pow(t, 2) * this.controlPoints[1][0] +
            Math.pow(t, 3) * this.end[0];
        return x;
    }

    getY(t: number) {
        const y =
            Math.pow(1 - t, 3) * this.start[1] +
            3 * Math.pow(1 - t, 2) * t * this.controlPoints[0][1] +
            3 * (1 - t) * Math.pow(t, 2) * this.controlPoints[1][1] +
            Math.pow(t, 3) * this.end[1];
        return y;
    }

    getRotation(t: number) {
        const x =
            3 *
                Math.pow(1 - t, 2) *
                (this.controlPoints[0][0] - this.start[0]) +
            6 *
                (1 - t) *
                t *
                (this.controlPoints[1][0] - this.controlPoints[0][0]) +
            3 * Math.pow(t, 2) * (this.end[0] - this.controlPoints[1][0]);
        const y =
            3 *
                Math.pow(1 - t, 2) *
                (this.controlPoints[0][1] - this.start[1]) +
            6 *
                (1 - t) *
                t *
                (this.controlPoints[1][1] - this.controlPoints[0][1]) +
            3 * Math.pow(t, 2) * (this.end[1] - this.controlPoints[1][1]);
        const rotation = Math.atan2(y, x);
        return rotation;
    }
}

const exampleTrajectory = computeSplinePoints();

export const Default = Template.bind({});

/**
 * If a trajectory is passed into the Field2d object, that trajectory will be rendered.
 *
 * It renders as a series of points.
 *
 * The trajectory is an array of numbers, where each three numbers represent an x, y, and rotation.
 *
 * Example: `[1, 1, 0, 1.1, 1, 0]` would be a trajectory that starts at `(1, 1)` and ends at `(1.1, 1)`.
 */
export const Trajectory = Template.bind({});

Default.args = { year: Year.ChargedUp, pose: [2.1, 4.4, 180] };

Trajectory.args = {
    year: Year.ChargedUp,
    pose: [2.1, 4.4, 180],
    trajectory: exampleTrajectory,
};
