import { NetworkTables } from "ntcore-ts-client";

export const MockedTopic = {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    publish: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
};

export const MockedNetworkTables = {
    changeURI: jest.fn(),
    createTopic: jest.fn().mockReturnValue(MockedTopic),
} as unknown as NetworkTables;
