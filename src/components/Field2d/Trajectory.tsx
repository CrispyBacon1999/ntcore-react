import React, { useMemo } from "react";
import { type Transform2d, useAllianceFlip, Units } from "./Util";

function Trajectory({
    trajectory,
}: {
    trajectory: number[];
}) {
    const trajectoryPoints: Transform2d[] = useMemo(() => {
        const points: Transform2d[] = [];
        for (let i = 0; i < trajectory.length; i += 3) {
            const x = trajectory[i];
            const y = trajectory[i + 1];
            points.push([x, y]);
        }
        return points;
    }, [trajectory]);

    const path = useAllianceFlip(trajectoryPoints);

    return <>
        {path.map((p, i) => <circle key={`trajectory-${i}`} cx={p[0]} cy={p[1]} r={Units.inchesToMeters(2)} fill="black" stroke="none" />)}
    </>;
}

export default Trajectory;
