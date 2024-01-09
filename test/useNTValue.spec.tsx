import React from "react";
import { NTProvider, useNTValue } from "../src";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { render, act } from "@testing-library/react";
import { MockedTopic } from "./mocks";

const TestComponent = () => {
    const state = useNTValue("test", NetworkTablesTypeInfos.kBoolean, false);
    return <div>{state.toString()}</div>;
};

const StringComponent = () => {
    const state = useNTValue<string>(
        "test",
        NetworkTablesTypeInfos.kString,
        "default"
    );
    return <div>{state}</div>;
};

test("useNTValue throws error if no NTProvider is found", () => {
    expect(() => {
        render(<TestComponent />);
    }).toThrowError(
        "No NTProvider found. Please wrap your application in an NTProvider"
    );
});

test("useNTValue returns default value if no value is found", async () => {
    const { getByText } = render(
        <NTProvider teamNumber={123}>
            <TestComponent />
        </NTProvider>
    );

    expect(await getByText("false")).toBeInTheDocument();
});

test("useNTValue returns value from network tables", async () => {
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

test("useNTValue updates value when network tables value changes", async () => {
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
            <StringComponent />
        </NTProvider>
    );

    act(() => {
        handler("Test");
    });

    expect(await getByText("Test")).toBeInTheDocument();

    rerender(
        <NTProvider teamNumber={123}>
            <StringComponent />
        </NTProvider>
    );

    act(() => {
        handler(null);
    });

    expect(await getByText("default")).toBeInTheDocument();
});

test("useNTValue unsubscribes from network tables when component unmounts", async () => {
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
