import { transformsToSVGPoints } from "../../../src/components/Field2d/Util";

describe("transformsToSVGPoints", () => {
    it("transforms a list of Transform2d to SVG points", () => {
        expect(
            transformsToSVGPoints([
                [0, 0],
                [1, 1],
            ])
        ).toEqual("0,0 1,1");
    });

    it("transforms an empty list into an empty string", () => {
        expect(transformsToSVGPoints([])).toEqual("");
    });
});
