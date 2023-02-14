import { act, render } from "@testing-library/react";
import React from "react";
import { NTProvider, useNTConnected } from "../src";
import { MockedNetworkTables } from "./mocks";

const TestComponent = () => {
    const connected = useNTConnected();
    return <div>{connected.toString()}</div>;
};

test("useNTConnected returns false if no NTProvider is found", () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText("false")).toBeInTheDocument();
});

test("useNTConnected accurately tracks the value from addRobotConnectionListener", async () => {
    let handler: (connected: boolean) => void;

    MockedNetworkTables.addRobotConnectionListener = jest
        .fn()
        .mockImplementation((listener: (connected: boolean) => void) => {
            handler = listener;
            return () => {};
        });

    const { getByText } = render(
        <NTProvider teamNumber={123}>
            <TestComponent />
        </NTProvider>
    );

    act(() => {
        handler(true);
    });

    expect(await getByText("true")).toBeInTheDocument();
});

test("useNTConnected calls cleanup function when unmounted", async () => {
    const cleanup = jest.fn();

    MockedNetworkTables.addRobotConnectionListener = jest
        .fn()
        .mockImplementation((_: (connected: boolean) => void) => {
            return cleanup;
        });

    const { unmount } = render(
        <NTProvider teamNumber={123}>
            <TestComponent />
        </NTProvider>
    );

    unmount();

    expect(cleanup).toHaveBeenCalled();
});
