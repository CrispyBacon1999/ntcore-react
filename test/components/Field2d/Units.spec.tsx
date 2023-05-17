import { Units } from "../../../src/components/Field2d/Util";

describe("Units", () => {
    describe("inchesToMeters", () => {
        it("converts inches to meters", () => {
            expect(Units.inchesToMeters(12)).toBeCloseTo(0.3048);
        });

        it("converts inches to meters with a negative number", () => {
            expect(Units.inchesToMeters(-12)).toBeCloseTo(-0.3048);
        });

        it("converts inches to meters with a zero", () => {
            expect(Units.inchesToMeters(0)).toBeCloseTo(0);
        });
    });

    describe("metersToInches", () => {
        it("converts meters to inches", () => {
            expect(Units.metersToInches(0.3048)).toBeCloseTo(12);
        });

        it("converts meters to inches with a negative number", () => {
            expect(Units.metersToInches(-0.3048)).toBeCloseTo(-12);
        });

        it("converts meters to inches with a zero", () => {
            expect(Units.metersToInches(0)).toBeCloseTo(0);
        });
    });

    describe("feetToMeters", () => {
        it("converts feet to meters", () => {
            expect(Units.feetToMeters(1)).toBeCloseTo(0.3048);
        });

        it("converts feet to meters with a negative number", () => {
            expect(Units.feetToMeters(-1)).toBeCloseTo(-0.3048);
        });

        it("converts feet to meters with a zero", () => {
            expect(Units.feetToMeters(0)).toBeCloseTo(0);
        });
    });

    describe("metersToFeet", () => {
        it("converts meters to feet", () => {
            expect(Units.metersToFeet(0.3048)).toBeCloseTo(1);
        });

        it("converts meters to feet with a negative number", () => {
            expect(Units.metersToFeet(-0.3048)).toBeCloseTo(-1);
        });

        it("converts meters to feet with a zero", () => {
            expect(Units.metersToFeet(0)).toBeCloseTo(0);
        });
    });

    describe("degreesToRadians", () => {
        it("converts degrees to radians", () => {
            expect(Units.degreesToRadians(180)).toBeCloseTo(Math.PI);
        });

        it("converts degrees to radians with a negative number", () => {
            expect(Units.degreesToRadians(-180)).toBeCloseTo(-Math.PI);
        });

        it("converts degrees to radians with a zero", () => {
            expect(Units.degreesToRadians(0)).toBeCloseTo(0);
        });
    });

    describe("radiansToDegrees", () => {
        it("converts radians to degrees", () => {
            expect(Units.radiansToDegrees(Math.PI)).toBeCloseTo(180);
        });

        it("converts radians to degrees with a negative number", () => {
            expect(Units.radiansToDegrees(-Math.PI)).toBeCloseTo(-180);
        });

        it("converts radians to degrees with a zero", () => {
            expect(Units.radiansToDegrees(0)).toBeCloseTo(0);
        });
    });
});
