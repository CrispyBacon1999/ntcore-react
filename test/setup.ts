import "@testing-library/jest-dom/extend-expect";
import { NetworkTables } from "ntcore-ts-client";
import { MockedNetworkTables } from "./mocks";

jest.spyOn(NetworkTables, "createInstanceByTeam").mockImplementation(
    (team: number, port?: number) => MockedNetworkTables
);

jest.spyOn(NetworkTables, "createInstanceByURI").mockImplementation(
    (uri: string, port?: number) => MockedNetworkTables
);

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
});

afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
});
