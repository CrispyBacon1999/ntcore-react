import React from "react";
import { Year } from "../../lib/util/Year";
import Field2dChargedUp from "./Fields/Field2dChargedUp";

/**
 * NetworkTables representation of a Pose2d
 */
export type Transform2d = [number, number];

/**
 * NetworkTables representation of a Rotation2d
 */
export type Rotation2d = number;

/**
 * NetworkTables representation of a Pose2d
 */
export type Pose2d = [...Transform2d, Rotation2d];

type YearData = {
    fieldMirrored: boolean;
    fieldSize: [number, number];
    fieldBase: () => JSX.Element;
};

export const Years: { [key in Year]: YearData } = {
    2023: {
        fieldMirrored: true,
        fieldSize: [inchesToMeters(651.25), inchesToMeters(315.5)],
        fieldBase: Field2dChargedUp,
    },
};

export const YearContext = React.createContext<Year>(Year.ChargedUp);

export const AllianceColorContext = React.createContext("red");

export function useAllianceColor() {
    return React.useContext(AllianceColorContext);
}

export function useYear() {
    const year = React.useContext(YearContext);
    return Years[year];
}

/**
 * For years that have a mirrored field, this function will flip the transform
 *
 * Otherwise, it will rotate the transform by 180 degrees
 *
 * @param transform
 */
export function useAllianceFlip(
    transform: Transform2d,
    force?: boolean
): Transform2d {
    const { fieldMirrored, fieldSize } = useYear();
    const allianceColor = useAllianceColor();

    if (force ?? (fieldMirrored && allianceColor === "red")) {
        return [fieldSize[0] - transform[0], transform[1]];
    } else {
        return [transform[0], transform[1]];
    }
}

export function useAllianceFlipArray(
    transforms: Transform2d[],
    force?: boolean
): Transform2d[] {
    const { fieldMirrored, fieldSize } = useYear();
    const allianceColor = useAllianceColor();

    return transforms.map((transform) => {
        if (force ?? (fieldMirrored && allianceColor === "red")) {
            return [fieldSize[0] - transform[0], transform[1]];
        } else {
            return [transform[0], transform[1]];
        }
    });
}

export function transformsToSVGPoints(transforms: Transform2d[]): string {
    return transforms.map((transform) => transform.join(",")).join(" ");
}

export function inchesToMeters(inches: number) {
    return inches * 0.0254;
}

export function metersToInches(meters: number) {
    return meters / 0.0254;
}

export function feetToMeters(feet: number) {
    return feet * 0.3048;
}

export function metersToFeet(meters: number) {
    return meters / 0.3048;
}

export function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

export function toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
}
