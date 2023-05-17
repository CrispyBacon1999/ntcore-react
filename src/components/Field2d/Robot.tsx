import React from "react";
import { Pose2d, inchesToMeters, toRadians, useAllianceColor } from "./Util";
import { CSSProperties } from "react";

export type RobotProps = {
    width: number;
    length: number;
};

const robotStyle: CSSProperties = {
    fill: "white",
    borderRadius: inchesToMeters(1.5),
    strokeLinejoin: "round",
};

function Robot({ width, length, pose }: RobotProps & { pose: Pose2d }) {
    const allianceColor = useAllianceColor();

    const red = allianceColor === "red";

    return (
        <>
            <rect
                width={width}
                height={length}
                // x={pose[0] - width / 2}
                // y={pose[1] - length / 2}
                stroke={
                    red
                        ? "var(--red-alliance-color)"
                        : "var(--blue-alliance-color)"
                }
                strokeWidth={inchesToMeters(3)}
                transform={`translate(${pose[0] - width / 2}, ${
                    pose[1] - length / 2
                }) rotate(${pose[2]})`}
                style={{
                    ...robotStyle,
                    transformBox: "fill-box",
                    transformOrigin: "center center",
                }}
            />
            <line
                x1={pose[0]}
                y1={pose[1]}
                x2={pose[0] + (Math.cos(toRadians(pose[2])) * width) / 2}
                y2={pose[1] + (Math.sin(toRadians(pose[2])) * width) / 2}
                stroke="black"
                strokeWidth={inchesToMeters(3)}
            />
        </>
    );
}

export default Robot;
