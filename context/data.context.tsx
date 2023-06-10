import Axios, { AxiosInstance } from 'axios';
import { UserDataType } from "@/global";
import { variables } from "@/constants";
import React from "react";
import useCookie from '@/hooks/useCookies';

interface DataContextProviderProps {
    children: React.ReactNode
}

interface DataContextType {
    setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>
    user: UserDataType | null

    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    isLoggedIn: boolean

    axios: AxiosInstance

    screen: "insights" | "tasks"
    setScreen: React.Dispatch<React.SetStateAction<"insights" | "tasks">>

}

const { API_ENDPOINT, BASE_URL } = variables.LOCAL;

const DataContext = React.createContext({} as DataContextType);

export const useApplicationData = () => React.useContext(DataContext);

export default function DataContextProvider(props: DataContextProviderProps) {
    const [user, setUser] = useCookie<UserDataType | null>("user", 2, null);
    const [isLoggedIn, setIsLoggedIn] = useCookie("isLoggedIn", 2, false);
    const [screen, setScreen] = useCookie<"insights" | "tasks">("screen", 2, "insights");

    const axios = Axios.create({ baseURL: API_ENDPOINT });

    return (
        <DataContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,

            setUser,
            user,

            axios,

            screen,
            setScreen
        }}>
            {props.children}
        </DataContext.Provider>
    )
}