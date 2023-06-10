import React from "react";

interface ModalContextProviderProps {
    children: React.ReactNode
}

interface ToastDataType {
    show: boolean
    msg: string
    type: boolean
}

interface ModalContextType {
    ToggleAlert: (show: boolean, msg?: string, type?: boolean) => void
    alert: ToastDataType
}

const ModalContext = React.createContext({} as ModalContextType);

export const useModalData = () => React.useContext(ModalContext);

export default function ModalContextProvider(props: ModalContextProviderProps) {
    const [alert, setAlert] = React.useState<ToastDataType>({ msg: "", show: false, type: true });

    const ToggleAlert = (show: boolean, msg?: string, type?: boolean) => {
        return setAlert({
            type: type ? type : alert.type,
            msg: msg ? msg : alert.msg,
            show: show,
        });
    }

    return (
        <ModalContext.Provider value={{
            ToggleAlert: ToggleAlert,
            alert,
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}