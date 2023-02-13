import { NetworkTablesTopic, NetworkTablesTypeInfo } from "ntcore-ts-client";
import { useContext, useEffect, useState } from "react";
import NTContext from "./NTContext";
import NTTopicTypes from "./NTTopicType";

const useNTState = <T extends NTTopicTypes>(
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
                } else {
                    console.error("No subuid to unsubscribe");
                }
            };
        } else {
            throw new Error(
                "No NTProvider found. Please wrap your application in an NTProvider"
            );
        }
    }, [key, client]);

    /**
     * Set the value of the topic
     *
     * Will likely throw an error if multiple apps try to set the value at the same time
     * @param value Value to set
     * @param publishProperties Properties to pass to the publish method
     */
    const setNTValue = (
        value: T,
        publishProperties?: {
            persistent?: boolean;
            retained?: boolean;
            id?: number;
        }
    ) => {
        if (topic) {
            topic.publish(publishProperties);
            topic.setValue(value);
        } else {
            console.error("Tried setting topic before it was created");
        }
    };

    return [value, setNTValue];
};

export default useNTState;
