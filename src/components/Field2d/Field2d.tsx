import React, { useMemo } from "react";
import { Year } from "../../lib/util/Year";
import { AllianceColorContext, Pose2d, YearContext } from "./Util";
import Robot, { RobotProps } from "./Robot";
import Trajectory from "./Trajectory";
import { Years } from "./Years";

export type Field2dProps = {
    year: Year;
    pose: Pose2d;
    robotProps?: RobotProps;
    isRed?: boolean;
    trajectory?: number[];
};

const field2dStyle = {
    "--field2d-stroke-color": "black",
    "--red-alliance-color": "red",
    "--blue-alliance-color": "blue",
    transform: "scaleY(-1)",
    border: "1px solid black",
};

export function Field2d({
    year,
    pose = [0, 0, 0],
    robotProps = { width: 0.75, length: 0.75 },
    isRed = false,
    trajectory,
}: Field2dProps) {
    const { fieldSize, fieldBase: FieldComponent } = useMemo(
        () => Years[year],
        [year]
    );

    return (
        <YearContext.Provider value={year}>
            <AllianceColorContext.Provider value={isRed ? "red" : "blue"}>
                <svg
                    viewBox={`0 0 ${fieldSize[0]} ${fieldSize[1]}`}
                    style={field2dStyle}
                >
                    <FieldComponent />
                    <Robot {...robotProps} pose={pose} />
                    {trajectory ? <Trajectory trajectory={trajectory} /> : null}
                </svg>
            </AllianceColorContext.Provider>
        </YearContext.Provider>
    );
}
