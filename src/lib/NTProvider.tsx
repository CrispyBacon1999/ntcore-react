import { useEffect, useState, useRef } from "react";
import { NetworkTables } from "ntcore-ts-client";
import NTContext from "./NTContext";

type NTProviderProps = {
    children?: React.ReactNode;
    port?: number;
    teamNumber?: number;
    uri?: string;
};

/**
 * Used to give the rest of the application access to the network tables connection. This component should be placed at the top of the component tree.
 * Pass in either a uri or a team number to create a network tables connection. If a uri is provided, the connection will be created using that uri. If a team number is provided, the connection will be created using the team number. If a uri is provided, the team number will be ignored.
 *
 * @param uri The uri of the network tables server
 * @param teamNumber The team number of the network tables server
 * @param port The port of the network tables server. Defaults to 5810
 * @returns
 */
export default function NTProvider({
    children = null,
    uri,
    teamNumber,
    port,
}: NTProviderProps) {
    const [ntConnection, setNtConnection] =
        useState<NetworkTables | null>(null);
    const [
        ntConnectionCreatedUsingTeamNumber,
        setNtConnectionCreatedUsingTeamNumber,
    ] = useState<boolean>(false);

    const oldTeamNumber = useRef<number | undefined>();

    useEffect(() => {
        // Create a network tables connection if one doesn't exist
        // Otherwise, reconnect using the uri, or throw an error if a team number is provided
        if (ntConnection === null) {
            if (uri) {
                setNtConnection(NetworkTables.createInstanceByURI(uri, port));
                setNtConnectionCreatedUsingTeamNumber(false);
            } else if (teamNumber) {
                setNtConnection(
                    NetworkTables.createInstanceByTeam(teamNumber, port)
                );
                setNtConnectionCreatedUsingTeamNumber(true);
                oldTeamNumber.current = teamNumber;
            } else {
                throw new Error(
                    "Either a uri or a team number must be provided to create a network tables connection"
                );
            }
        } else if (uri) {
            ntConnection.changeURI(uri, port);
            setNtConnectionCreatedUsingTeamNumber(false);
        } else if (
            teamNumber !== oldTeamNumber.current &&
            ntConnectionCreatedUsingTeamNumber
        ) {
            throw new Error(
                "There is currently no support for changing a team number after the connection has been created. Use a uri instead."
            );
        } else {
            throw new Error(
                "Either a uri or a team number must be provided to create a network tables connection"
            );
        }
    }, [uri, teamNumber, port]);

    return (
        <NTContext.Provider value={ntConnection}>
            {ntConnection ? children : null}
        </NTContext.Provider>
    );
}
