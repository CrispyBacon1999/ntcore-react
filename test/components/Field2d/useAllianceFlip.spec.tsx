import { act, render, renderHook } from "@testing-library/react";
import React, { ReactNode } from "react";
import {
    AllianceColorContext,
    YearContext,
    Years,
    useAllianceFlip,
} from "../../../src/components/Field2d/Util";
import { Year } from "../../../src/lib/util/Year";

describe("useAllianceFlip", () => {
    const fieldSize = Years[2023].fieldSize;
    describe("when isRed is true", () => {
        const wrapper = ({ children }: { children: ReactNode }) => {
            return (
                <YearContext.Provider value={Year.ChargedUp}>
                    <AllianceColorContext.Provider value="red">
                        {children}
                    </AllianceColorContext.Provider>
                </YearContext.Provider>
            );
        };

        describe("Transform2d", () => {
            it("flips the x coordinate", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2], false),
                    { wrapper }
                );
                expect(result.current[0]).toEqual(fieldSize[0] - 2);
            });

            it("doesn't flip the y coordinate", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2], false),
                    { wrapper }
                );
                expect(result.current[1]).toEqual(2);
            });
        });

        describe("Transform2d[]", () => {
            it("flips the x coordinate for all transforms", () => {
                const { result } = renderHook(
                    () =>
                        useAllianceFlip(
                            [
                                [2, 2],
                                [3, 3],
                            ],
                            false
                        ),
                    { wrapper }
                );
                expect(result.current[0][0]).toEqual(fieldSize[0] - 2);
                expect(result.current[1][0]).toEqual(fieldSize[0] - 3);
            });

            it("doesn't flip the y coordinate for all transforms", () => {
                const { result } = renderHook(
                    () =>
                        useAllianceFlip(
                            [
                                [2, 2],
                                [3, 3],
                            ],
                            false
                        ),
                    { wrapper }
                );
                expect(result.current[0][1]).toEqual(2);
                expect(result.current[1][1]).toEqual(3);
            });
        });

        describe("Pose2d", () => {
            it("flips the x coordinate", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 0], true),
                    { wrapper }
                );
                expect(result.current[0]).toEqual(fieldSize[0] - 2);
            });

            it("doesn't flip the y coordinate", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 0], true),
                    { wrapper }
                );
                expect(result.current[1]).toEqual(2);
            });

            it("flips the angle", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 90], true),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(-90);
            });

            it("flips the angle when it's negative", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, -90], true),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(90);
            });

            it("flips the angle when it's greater than 180", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 270], true),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(90);
            });

            it("flips the angle when it's less than -180", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, -270], true),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(-90);
            });

            it("flips the angle when it's greater than 360", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 450], true),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(-90);
            });

            it("flips the angle when it's less than -360", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, -450], true),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(90);
            });

            it("flips the angle when it's 180", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 180], true),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(0);
            });

            it("flips the angle when it's -180", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, -180], true),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(0);
            });
        });
    });

    describe("when isRed is false", () => {
        const wrapper = ({ children }: { children: ReactNode }) => {
            return (
                <YearContext.Provider value={Year.ChargedUp}>
                    <AllianceColorContext.Provider value="blue">
                        {children}
                    </AllianceColorContext.Provider>
                </YearContext.Provider>
            );
        };

        describe("Transform2d", () => {
            it("doesn't flip the x coordinate", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2], false),
                    { wrapper }
                );
                expect(result.current[0]).toEqual(2);
            });

            it("doesn't flip the y coordinate", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2], false),
                    { wrapper }
                );
                expect(result.current[1]).toEqual(2);
            });
        });

        describe("Transform2d[]", () => {
            it("doesn't flip the x coordinate for all transforms", () => {
                const { result } = renderHook(
                    () =>
                        useAllianceFlip(
                            [
                                [2, 2],
                                [3, 3],
                            ],
                            false
                        ),
                    { wrapper }
                );
                expect(result.current[0][0]).toEqual(2);
                expect(result.current[1][0]).toEqual(3);
            });

            it("doesn't flip the y coordinate for all transforms", () => {
                const { result } = renderHook(
                    () =>
                        useAllianceFlip(
                            [
                                [2, 2],
                                [3, 3],
                            ],
                            false
                        ),
                    { wrapper }
                );
                expect(result.current[0][1]).toEqual(2);
                expect(result.current[1][1]).toEqual(3);
            });
        });

        describe("Pose2d", () => {
            it("doesn't flip the x coordinate", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 0], false),
                    { wrapper }
                );
                expect(result.current[0]).toEqual(2);
            });

            it("doesn't flip the y coordinate", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 0], false),
                    { wrapper }
                );
                expect(result.current[1]).toEqual(2);
            });

            it("doesn't flip the angle", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, 90], false),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(90);
            });

            it("doesn't flip the angle when it's negative", () => {
                const { result } = renderHook(
                    () => useAllianceFlip([2, 2, -90], false),
                    { wrapper }
                );
                expect(result.current[2]).toEqual(-90);
            });
        });
    });
});
