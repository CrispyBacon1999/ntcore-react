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
});
