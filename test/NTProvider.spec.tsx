import { render } from "@testing-library/react";

import NTProvider from "../src/lib/NTProvider";
import { NetworkTables } from "ntcore-ts-client";
import React from "react";
import { MockedNetworkTables } from "./mocks";

test("NTProvider creates NT Instance using team number", () => {
    render(<NTProvider teamNumber={123}></NTProvider>);

    expect(NetworkTables.getInstanceByTeam).toHaveBeenCalledWith(
        123,
        undefined
    );
});

test("NTProvider throws error if no uri or team number is provided", () => {
    expect(() => {
        render(<NTProvider></NTProvider>);
    }).toThrowError(
        "Either a uri or a team number must be provided to create a network tables connection"
    );
});

test("NTProvider uses uri if both uri and team number are provided", () => {
    render(<NTProvider uri={"test"} teamNumber={123}></NTProvider>);
    expect(NetworkTables.getInstanceByURI).toHaveBeenCalledWith(
        "test",
        undefined
    );
    expect(NetworkTables.getInstanceByTeam).not.toHaveBeenCalled();
});

test("NTProvider successfully changes uri if it is changed after connection is created", () => {
    const { rerender } = render(<NTProvider uri={"test"}></NTProvider>);
    rerender(<NTProvider uri={"test2"}></NTProvider>);

    expect(NetworkTables.getInstanceByURI).toHaveBeenCalledWith(
        "test",
        undefined
    );
    expect(MockedNetworkTables.changeURI).toHaveBeenCalledWith(
        "test2",
        undefined
    );
});

test("NTProvider throws error if neither team number or uri are provided after connection is created", () => {
    const { rerender } = render(<NTProvider uri={"test"}></NTProvider>);
    expect(() => {
        rerender(<NTProvider></NTProvider>);
    }).toThrowError(
        "Either a uri or a team number must be provided to create a network tables connection"
    );
});

test("NTProvider throws error if team number is changed after connection is created", () => {
    const { rerender } = render(<NTProvider teamNumber={123}></NTProvider>);
    expect(() => {
        rerender(<NTProvider teamNumber={456}></NTProvider>);
    }).toThrowError(
        "There is currently no support for changing a team number after the connection has been created. Use a uri instead."
    );
});

test("NTProvider creates NT Instance using URI", () => {
    render(<NTProvider uri={"test"}></NTProvider>);

    expect(NetworkTables.getInstanceByURI).toHaveBeenCalledWith(
        "test",
        undefined
    );
});
