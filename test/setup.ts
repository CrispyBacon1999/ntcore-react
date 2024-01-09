import "@testing-library/jest-dom/extend-expect";
import { NetworkTables } from "ntcore-ts-client";
import { MockedNetworkTables } from "./mocks";

jest.spyOn(NetworkTables, "getInstanceByTeam").mockReturnValue(
    MockedNetworkTables
);

jest.spyOn(NetworkTables, "getInstanceByURI").mockReturnValue(
    MockedNetworkTables
);

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => null);
});

afterEach(() => {
    jest.spyOn(console, "error").mockRestore();
});
