import { createContext, useContext } from "react";
import { Year } from "../../lib/util/Year";
import { Years } from "./Years";

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

export const YearContext = createContext<Year>(Year.ChargedUp);

export const AllianceColorContext = createContext("red");

export function useAllianceColor() {
    return useContext(AllianceColorContext);
}

export function useYear() {
    const year = useContext(YearContext);
    return Years[year];
}

/**
 * For years that have a mirrored field, this function will flip the transform
 *
 * Otherwise, it will rotate the transform by 180 degrees
 *
 * @param transform
 */
function useAllianceFlipTransform2d(
    transform: Transform2d,
    force?: boolean
): Transform2d {
    const { fieldMirrored, fieldSize } = useYear();
    const allianceColor = useAllianceColor();

    if (force === true || (fieldMirrored && allianceColor === "red")) {
        return [fieldSize[0] - transform[0], transform[1]];
    } else {
        return [transform[0], transform[1]];
    }
}

function useAllianceFlipTransform2dArray(
    transforms: Transform2d[],
    force?: boolean
): Transform2d[] {
    const { fieldMirrored, fieldSize } = useYear();
    const allianceColor = useAllianceColor();

    return transforms.map((transform) => {
        if (force === true || (fieldMirrored && allianceColor === "red")) {
            return [fieldSize[0] - transform[0], transform[1]];
        } else {
            return [transform[0], transform[1]];
        }
    });
}

function useAllianceFlipPose2d(transform: Pose2d, force?: boolean): Pose2d {
    const { fieldMirrored, fieldSize } = useYear();
    const allianceColor = useAllianceColor();

    if (force === true || (fieldMirrored && allianceColor === "red")) {
        // Flip x coordinate
        // Don't flip y coordinate
        // Flip rotation by 180 degrees (map to [-180, 180])
        return [
            fieldSize[0] - transform[0],
            transform[1],
            transform[2] >= 0
                ? ((transform[2] + 360) % 360) - 180
                : ((transform[2] - 360) % 360) + 180,
        ];
    } else {
        return [transform[0], transform[1], transform[2]];
    }
}

export function useAllianceFlip(
    transform: Transform2d,
    force?: boolean
): Transform2d;
export function useAllianceFlip(
    transforms: Transform2d[],
    force?: boolean
): Transform2d[];
export function useAllianceFlip(transform: Pose2d, force?: boolean): Pose2d;

export function useAllianceFlip(
    transform: Transform2d | Transform2d[] | Pose2d,
    force?: boolean
): Transform2d | Transform2d[] | Pose2d {
    if (Array.isArray(transform)) {
        if (Array.isArray(transform[0])) {
            return useAllianceFlipTransform2dArray(
                transform as Transform2d[],
                force
            );
        }
        if (transform.length === 2) {
            return useAllianceFlipTransform2d(transform as Transform2d, force);
        }
        if (transform.length === 3) {
            return useAllianceFlipPose2d(transform as Pose2d, force);
        }
        return transform;
    } else {
        return useAllianceFlipTransform2d(transform, force);
    }
}

export function transformsToSVGPoints(transforms: Transform2d[]): string {
    return transforms.map((transform) => transform.join(",")).join(" ");
}
