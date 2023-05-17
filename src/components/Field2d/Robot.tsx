import React from "react";
import {
    Pose2d,
    inchesToMeters,
    toRadians,
    useAllianceColor,
    useAllianceFlip,
} from "./Util";
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

    const robotPose = useAllianceFlip(pose);

    return (
        <>
            <rect
                width={width}
                height={length}
                stroke={
                    red
                        ? "var(--red-alliance-color)"
                        : "var(--blue-alliance-color)"
                }
                strokeWidth={inchesToMeters(3)}
                transform={`translate(${robotPose[0] - width / 2}, ${
                    robotPose[1] - length / 2
                }) rotate(${robotPose[2]})`}
                style={{
                    ...robotStyle,
                    transformBox: "fill-box",
                    transformOrigin: "center center",
                }}
            />
            <line
                x1={robotPose[0]}
                y1={robotPose[1]}
                x2={
                    robotPose[0] +
                    (Math.cos(toRadians(robotPose[2])) * width) / 2
                }
                y2={
                    robotPose[1] +
                    (Math.sin(toRadians(robotPose[2])) * width) / 2
                }
                stroke="black"
                strokeWidth={inchesToMeters(3)}
            />
        </>
    );
}

export default Robot;
