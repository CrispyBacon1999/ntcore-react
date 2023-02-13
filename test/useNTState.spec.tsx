import React from "react";
import { NTProvider, useNTState } from "../src";
import { NetworkTableTypeInfos } from "ntcore-ts-client";
import { render } from "@testing-library/react";

const TestComponent = () => {
    const [state, setState] = useNTState(
        "test",
        NetworkTableTypeInfos.kBoolean,
        false
    );
    return <div>{state.toString()}</div>;
};

test("useNTState throws error if no NTProvider is found", () => {
    expect(() => {
        render(<TestComponent />);
    }).toThrowError(
        "No NTProvider found. Please wrap your application in an NTProvider"
    );
});

test("useNTState returns default value if no value is found", async () => {
    const { getByText } = render(
        <NTProvider teamNumber={123}>
            <TestComponent />
        </NTProvider>
    );

    expect(await getByText("false")).toBeInTheDocument();
});
