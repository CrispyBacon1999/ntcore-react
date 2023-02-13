import { createContext } from "react";
import { NetworkTables } from "ntcore-ts-client";

type NTContextType = NetworkTables | null;

const NTContext = createContext<NTContextType>(null);

export default NTContext;
