import React from "react";
import { NTProvider, useNTState } from "../src";
import { NetworkTableTypeInfos } from "ntcore-ts-client";
import { render, act, fireEvent } from "@testing-library/react";
import { MockedTopic } from "./mocks";

const TestComponent = () => {
    const [state] = useNTState("test", NetworkTableTypeInfos.kBoolean, false);
    return <div>{state.toString()}</div>;
};

const TestComponentUpdate = () => {
    const [state, setState] = useNTState<string>(
        "test",
        NetworkTableTypeInfos.kString,
        "Test"
    );
    return (
        <>
            <button
                onClick={() => {
                    setState("Test2");
                }}
            >
                Update
            </button>
            <div>{state}</div>
        </>
    );
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

test("useNTState returns value from network tables", async () => {
    let handler: (value: string) => number;

    MockedTopic.subscribe.mockImplementation(
        (listener: (value: string) => number) => {
            handler = listener;
            return 1;
        }
    );

    const { getByText } = render(
        <NTProvider teamNumber={123}>
            <TestComponent />
        </NTProvider>
    );

    act(() => {
        handler("Test");
    });

    expect(await getByText("Test")).toBeInTheDocument();
});

test("useNTState updates value when network tables value changes", async () => {
    let handler: (value: string) => number;

    MockedTopic.subscribe.mockImplementation(
        (listener: (value: string) => number) => {
            handler = listener;
            return 1;
        }
    );

    const { getByText, rerender } = render(
        <NTProvider teamNumber={123}>
            <TestComponent />
        </NTProvider>
    );

    act(() => {
        handler("Test");
    });

    expect(await getByText("Test")).toBeInTheDocument();

    rerender(
        <NTProvider teamNumber={123}>
            <TestComponent />
        </NTProvider>
    );

    act(() => {
        handler("Test2");
    });

    expect(await getByText("Test2")).toBeInTheDocument();
});

test("useNTValue uses the default value if the network tables value is null", async () => {
    let handler: (value: string | null) => number;

    MockedTopic.subscribe.mockImplementation(
        (listener: (value: string | null) => number) => {
            handler = listener;
            return 1;
        }
    );

    const { getByText, rerender } = render(
        <NTProvider teamNumber={123}>
            <TestComponentUpdate />
        </NTProvider>
    );

    act(() => {
        handler("Test Actual Data");
    });

    expect(await getByText("Test Actual Data")).toBeInTheDocument();

    rerender(
        <NTProvider teamNumber={123}>
            <TestComponentUpdate />
        </NTProvider>
    );

    act(() => {
        handler(null);
    });

    expect(await getByText("Test")).toBeInTheDocument();
});

test("useNTState unsubscribes from network tables when component unmounts", async () => {
    let handler: (value: string) => number;

    MockedTopic.subscribe.mockImplementation(
        (listener: (value: string) => number) => {
            handler = listener;
            return 1;
        }
    );

    const { getByText, unmount } = render(
        <NTProvider teamNumber={123}>
            <TestComponent />
        </NTProvider>
    );

    act(() => {
        handler("Test");
    });

    expect(await getByText("Test")).toBeInTheDocument();

    unmount();

    expect(MockedTopic.unsubscribe).toHaveBeenCalledWith(1);
});

test("useNTState sends value to network tables when state is changed", async () => {
    const { getByText } = render(
        <NTProvider teamNumber={123}>
            <TestComponentUpdate />
        </NTProvider>
    );

    expect(await getByText("Test")).toBeInTheDocument();

    await fireEvent.click(getByText("Update"));

    expect(await getByText("Test2")).toBeInTheDocument();

    expect(MockedTopic.publish).toHaveBeenCalled();
    expect(MockedTopic.setValue).toHaveBeenCalledWith("Test2");
});
