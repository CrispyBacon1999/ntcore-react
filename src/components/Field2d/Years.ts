import Units from "../../lib/util/Units";
import { Year } from "../../lib/util/Year";

import Field2dChargedUp from "./Fields/Field2dChargedUp";

type YearData = {
    fieldMirrored: boolean;
    fieldSize: [number, number];
    fieldBase: () => JSX.Element;
};

export const Years: { [key in Year]: YearData } = {
    2023: {
        fieldMirrored: true,
        fieldSize: [Units.inchesToMeters(651.25), Units.inchesToMeters(315.5)],
        fieldBase: Field2dChargedUp,
    },
};
