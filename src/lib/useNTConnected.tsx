import { useContext, useEffect, useState } from "react";
import NTContext from "./NTContext";

const useNTConnected = () => {
    const client = useContext(NTContext);
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        if (client) {
            const cleanup = client.addRobotConnectionListener((connected) => {
                setConnected(connected);
            });
            return () => {
                if (cleanup) {
                    cleanup();
                }
            };
        }
    }, [client]);

    return connected;
};

export default useNTConnected;
