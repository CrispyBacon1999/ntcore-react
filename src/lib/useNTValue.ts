import { NetworkTablesTopic, NetworkTablesTypeInfo } from "ntcore-ts-client";
import { useContext, useEffect, useState } from "react";
import NTContext from "./NTContext";
import NTTopicTypes from "./NTTopicType";

const useNTValue = <T extends NTTopicTypes>(
    key: string,
    ntType: NetworkTablesTypeInfo,
    defaultValue: T
) => {
    const client = useContext(NTContext);
    const [topic, setTopic] = useState<NetworkTablesTopic<T> | null>(null);
    const [value, setValue] = useState<T>(defaultValue);
    const [subuid, setSubuid] = useState<number | null>(null);

    useEffect(() => {
        if (client) {
            const listener = (value: T | null) => {
                setValue(value ?? defaultValue);
            };
            const topic = client.createTopic(key, ntType, defaultValue);
            setTopic(topic);
            const subuid = topic.subscribe(listener);
            setSubuid(subuid);

            return () => {
                if (subuid) {
                    topic.unsubscribe(subuid);
                }
            };
        } else {
            throw new Error(
                "No NTProvider found. Please wrap your application in an NTProvider"
            );
        }
    }, [key, client]);

    return value;
};

export default useNTValue;
