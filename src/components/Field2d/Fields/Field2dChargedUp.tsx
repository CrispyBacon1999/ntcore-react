import React from "react";
import {
    Transform2d,
    Units,
    transformsToSVGPoints,
    useAllianceFlip,
} from "../Util";

namespace FieldParams {
    export const fieldWidth = Units.inchesToMeters(651.25);
    export const fieldHeight = Units.inchesToMeters(315.5);
    export const tapeWidth = Units.inchesToMeters(2);

    export namespace Community {
        export const innerX = 0;
        export const midX = Units.inchesToMeters(132.375);
        export const outerX = Units.inchesToMeters(193.25);
        export const leftY = Units.feetToMeters(18);
        export const midY = leftY - Units.inchesToMeters(59.39) + tapeWidth;
        export const rightY = 0;
        export const regionCorners: Transform2d[] = [
            [innerX, rightY],
            [innerX, leftY],
            [midX, leftY],
            [midX, midY],
            [outerX, midY],
            [outerX, rightY],
        ];
        export const tapeLines: Transform2d[] = regionCorners.slice(2);
    }

    export namespace ChargingStation {
        export const width = Units.inchesToMeters(76.125);
        export const height = Units.inchesToMeters(97.25);
        export const flapWidth = Units.inchesToMeters(12);
        export const outerX = Community.outerX - tapeWidth;
        export const innerX = outerX - width;
        export const leftY = Community.midY - tapeWidth;
        export const rightY = leftY - height;
        export const regionCorners: Transform2d[] = [
            [innerX, rightY],
            [innerX, leftY],
            [outerX, leftY],
            [outerX, rightY],
        ];
        export const flapCornersInner: Transform2d[] = [
            [innerX, leftY],
            [innerX + flapWidth, leftY],
            [innerX + flapWidth, rightY],
            [innerX, rightY],
        ];
        export const flapCornersOuter: Transform2d[] = [
            [outerX, leftY],
            [outerX - flapWidth, leftY],
            [outerX - flapWidth, rightY],
            [outerX, rightY],
        ];
    }

    export namespace Grid {
        export const leftY = Community.leftY;
        export const rightY = Community.rightY;
        export const innerX = Units.inchesToMeters(13.926);
        export const outerX = Units.inchesToMeters(64.99);
        export const lowX = outerX - Units.inchesToMeters(16.113);
        export const endPoleY = Units.inchesToMeters(20.19);
        export const poleSeparationY = Units.inchesToMeters(22);
        export const endAdditionalWidth = Units.inchesToMeters(9.19);

        export const cubeShelfWidth = Units.inchesToMeters(14.25);

        export const separatorWidth = Units.inchesToMeters(3.5);

        export const separatorY: number[] = [
            leftY,
            leftY - endAdditionalWidth - poleSeparationY,
            leftY - endAdditionalWidth - poleSeparationY * 2,
            leftY - endAdditionalWidth - poleSeparationY * 3,
            leftY - endAdditionalWidth - poleSeparationY * 4,
            leftY - endAdditionalWidth - poleSeparationY * 5,
            leftY - endAdditionalWidth - poleSeparationY * 6,
            leftY - endAdditionalWidth - poleSeparationY * 7,
            leftY - endAdditionalWidth - poleSeparationY * 8,
            leftY - endAdditionalWidth * 2 - poleSeparationY * 9,
        ];
    }

    export namespace LoadingZone {
        export const width = Units.inchesToMeters(99);
        export const innerX = fieldWidth;
        export const midX = fieldWidth - Units.inchesToMeters(132.25);
        export const outerX = fieldWidth - Units.inchesToMeters(264.25);
        export const leftY = fieldHeight;
        export const midY = leftY - Units.inchesToMeters(50.5);
        export const rightY = leftY - width;
        export const regionCorners: Transform2d[] = [
            [midX, rightY],
            [midX, midY],
            [outerX, midY],
            [outerX, leftY],
            [innerX, leftY],
            [innerX, rightY],
        ];
    }

    export namespace DoubleSubstation {
        export const width = Units.inchesToMeters(14);
        export const corners: Transform2d[] = [
            [LoadingZone.innerX, fieldHeight],
            [LoadingZone.innerX - width, fieldHeight],
            [LoadingZone.innerX - width, LoadingZone.rightY],
            [LoadingZone.innerX, LoadingZone.rightY],
        ];
    }

    export namespace SingleSubstation {
        export const width = Units.inchesToMeters(22.75);
        export const leftX =
            fieldWidth - DoubleSubstation.width - Units.inchesToMeters(88.77);
        export const depth = Units.inchesToMeters(4);

        export const corners: Transform2d[] = [
            [leftX, fieldHeight],
            [leftX + width, fieldHeight],
            [leftX + width, fieldHeight - depth],
            [leftX, fieldHeight - depth],
        ];
    }
}

const chargingStationStyle = {
    fill: "none",
    stroke: "var(--field2d-stroke-color)",
    strokeWidth: FieldParams.tapeWidth,
};

const gridStyle = {
    fill: "rgba(120, 120, 120)",
    stroke: "var(--field2d-stroke-color)",
    strokeWidth: FieldParams.tapeWidth / 4,
};

const gridStyleRed = {
    ...gridStyle,
    fill: "var(--red-alliance-color)",
};

const gridStyleBlue = {
    ...gridStyle,
    fill: "var(--blue-alliance-color)",
};

const gridStyleCoopertition = {
    ...gridStyle,
    fill: "rgba(50, 50, 50)",
};

const gridSeparatorStyle = {
    fill: "none",
    stroke: "rgba(80, 80, 80)",
    strokeWidth: FieldParams.Grid.separatorWidth,
};

const cubeShelfStyle = {
    fill: "rgba(180, 180, 180)",
    stroke: "var(--field2d-stroke-color)",
    strokeWidth: FieldParams.tapeWidth / 4,
};

const tapeLineStyle = {
    fill: "none",
    strokeWidth: FieldParams.tapeWidth,
};

const tapeLineStyleRed = {
    ...tapeLineStyle,
    stroke: "var(--red-alliance-color)",
};

const tapeLineStyleBlue = {
    ...tapeLineStyle,
    stroke: "var(--blue-alliance-color)",
};

export default function Field2dChargedUp() {
    return (
        <>
            <ChargingStation />
            <ChargingStation red />
            <Grid />
            <Grid red />
            <Barrier />
            <Barrier red />
            <SingleSubstation />
            <SingleSubstation red />
            <DoubleSubstation />
            <DoubleSubstation red />
            <CommunityTapeLines />
            <CommunityTapeLines red />
            <LoadingZoneTapeLines />
            <LoadingZoneTapeLines red />
        </>
    );
}

function ChargingStation({ red = false }: { red?: boolean }) {
    const positions = useAllianceFlip(
        FieldParams.ChargingStation.regionCorners,
        red
    );

    return (
        <>
            <polygon
                style={chargingStationStyle}
                points={transformsToSVGPoints(positions)}
            />
            <ChargingStationFlap red={red} />
        </>
    );
}

function ChargingStationFlap({ red = false }: { red?: boolean }) {
    const positionAllianceWall = useAllianceFlip(
        FieldParams.ChargingStation.flapCornersInner,
        red
    );
    const positionFieldCenter = useAllianceFlip(
        FieldParams.ChargingStation.flapCornersOuter,
        red
    );

    return (
        <>
            <polygon
                style={chargingStationStyle}
                points={transformsToSVGPoints(positionAllianceWall)}
            />
            <polygon
                style={chargingStationStyle}
                points={transformsToSVGPoints(positionFieldCenter)}
            />
        </>
    );
}

function CommunityTapeLines({ red = false }: { red?: boolean }) {
    const positions = useAllianceFlip(FieldParams.Community.tapeLines, red);

    const gridFront = useAllianceFlip(
        [
            [FieldParams.Grid.outerX, FieldParams.Community.leftY],
            [FieldParams.Grid.outerX, FieldParams.Community.rightY],
        ],
        red
    );

    return (
        <>
            <polyline
                style={red ? tapeLineStyleRed : tapeLineStyleBlue}
                points={transformsToSVGPoints(positions)}
            />
            <polyline
                style={red ? tapeLineStyleRed : tapeLineStyleBlue}
                points={transformsToSVGPoints(gridFront)}
            />
        </>
    );
}

function Grid({ red = false }: { red?: boolean }) {
    return (
        <>
            <GridBackPlate red={red} />
            {FieldParams.Grid.separatorY.map((_, i) => (
                <GridSeparator red={red} position={i} />
            ))}
            <GridConeSection red={red} position={0} />
            <GridCubeShelf red={red} position={1} />
            <GridConeSection red={red} position={2} />
            <GridConeSection red={red} position={3} />
            <GridCubeShelf red={red} position={4} />
            <GridConeSection red={red} position={5} />
            <GridConeSection red={red} position={6} />
            <GridCubeShelf red={red} position={7} />
            <GridConeSection red={red} position={8} />
        </>
    );
}

function GridCubeShelf({
    red = false,
    position,
}: {
    red?: boolean;
    position: number;
}) {
    const separators = FieldParams.Grid.separatorY.slice(
        position,
        position + 2
    );

    const positionsInner = useAllianceFlip(
        [
            [FieldParams.Grid.innerX, separators[0]],
            [
                (FieldParams.Grid.innerX + FieldParams.Grid.lowX) / 2,
                separators[0],
            ],
            [
                (FieldParams.Grid.innerX + FieldParams.Grid.lowX) / 2,
                separators[1],
            ],
            [FieldParams.Grid.innerX, separators[1]],
        ],
        red
    );
    const positionsOuter = useAllianceFlip(
        [
            [
                (FieldParams.Grid.innerX + FieldParams.Grid.lowX) / 2,
                separators[0],
            ],
            [FieldParams.Grid.lowX, separators[0]],
            [FieldParams.Grid.lowX, separators[1]],
            [
                (FieldParams.Grid.innerX + FieldParams.Grid.lowX) / 2,
                separators[1],
            ],
        ],
        red
    );

    return (
        <>
            <polygon
                style={cubeShelfStyle}
                points={transformsToSVGPoints(positionsInner)}
            />
            <polygon
                style={cubeShelfStyle}
                points={transformsToSVGPoints(positionsOuter)}
            />
        </>
    );
}

function GridConeSection({
    red = false,
    position = 0,
}: {
    red?: boolean;
    position?: number;
}) {
    const separators = FieldParams.Grid.separatorY.slice(
        position,
        position + 2
    );

    const coopertition = position === 3 || position === 5;

    const positions = useAllianceFlip(
        [
            [FieldParams.Grid.innerX, separators[0]],
            [FieldParams.Grid.lowX, separators[0]],
            [FieldParams.Grid.lowX, separators[1]],
            [FieldParams.Grid.innerX, separators[1]],
        ],
        red
    );

    return (
        <>
            <polygon
                style={
                    coopertition
                        ? gridStyleCoopertition
                        : red
                        ? gridStyleRed
                        : gridStyleBlue
                }
                points={transformsToSVGPoints(positions)}
            />
        </>
    );
}

function GridSeparator({
    red = false,
    position,
}: {
    red?: boolean;
    position: number;
}) {
    const positions = useAllianceFlip(
        [
            [FieldParams.Grid.lowX, FieldParams.Grid.separatorY[position]],
            [FieldParams.Grid.outerX, FieldParams.Grid.separatorY[position]],
        ],
        red
    );

    return (
        <>
            <polyline
                style={gridSeparatorStyle}
                points={transformsToSVGPoints(positions)}
            />
        </>
    );
}

function GridBackPlate({ red = false }: { red?: boolean }) {
    const positions = useAllianceFlip(
        [
            [FieldParams.Community.innerX, FieldParams.Community.leftY],
            [FieldParams.Grid.innerX, FieldParams.Community.leftY],
            [FieldParams.Grid.innerX, FieldParams.Community.rightY],
            [FieldParams.Community.innerX, FieldParams.Community.rightY],
        ],
        red
    );

    return (
        <>
            <polygon
                style={gridStyle}
                points={transformsToSVGPoints(positions)}
            />
        </>
    );
}

function Barrier({ red = false }: { red?: boolean }) {
    const positions = useAllianceFlip(
        [
            [FieldParams.Community.innerX, FieldParams.Community.leftY],
            [FieldParams.Community.midX, FieldParams.Community.leftY],
        ],
        red
    );

    return (
        <>
            <polyline
                style={gridSeparatorStyle}
                points={transformsToSVGPoints(positions)}
            />
        </>
    );
}

function SingleSubstation({ red = false }: { red?: boolean }) {
    const positions = useAllianceFlip(
        FieldParams.SingleSubstation.corners,
        red
    );

    return (
        <>
            <polygon
                style={gridStyle}
                points={transformsToSVGPoints(positions)}
            />
        </>
    );
}

function DoubleSubstation({ red = false }: { red?: boolean }) {
    const positions = useAllianceFlip(
        FieldParams.DoubleSubstation.corners,
        red
    );

    return (
        <>
            <polygon
                style={gridStyle}
                points={transformsToSVGPoints(positions)}
            />
        </>
    );
}

function LoadingZoneTapeLines({ red = false }: { red?: boolean }) {
    const positions = useAllianceFlip(
        FieldParams.LoadingZone.regionCorners.slice(0, 4),
        red
    );

    return (
        <>
            <polyline
                style={red ? tapeLineStyleRed : tapeLineStyleBlue}
                points={transformsToSVGPoints(positions)}
            />
        </>
    );
}
