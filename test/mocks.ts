import { NetworkTables } from "ntcore-ts-client";

export const MockedSubscribe = jest.fn();

export const MockedTopic = {
    subscribe: jest.fn().mockReturnValue(1),
    unsubscribe: jest.fn(),
    publish: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
};

export const MockedNetworkTables = {
    changeURI: jest.fn(),
    createTopic: jest.fn().mockReturnValue(MockedTopic),
} as unknown as NetworkTables;
