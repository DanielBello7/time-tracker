import { UserDataType } from "@/global";
import React from "react";

interface DataContextProviderProps {
    children: React.ReactNode
}

interface DataContextType {
    setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>
    user: UserDataType | null

    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    isLoggedIn: boolean
}

const DataContext = React.createContext({} as DataContextType);

export const useApplicationData = () => React.useContext(DataContext);

export default function DataContextProvider(props: DataContextProviderProps) {
    const [user, setUser] = React.useState<UserDataType | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <DataContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,

            setUser,
            user
        }}>
            {props.children}
        </DataContext.Provider>
    )
}