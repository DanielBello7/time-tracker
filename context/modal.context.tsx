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
    ToggleToast: (show: boolean, msg?: string, type?: boolean) => void
    toast: ToastDataType
}

const ModalContext = React.createContext({} as ModalContextType);

export const useModalData = () => React.useContext(ModalContext);

export default function ModalContextProvider(props: ModalContextProviderProps) {
    const [toast, setToast] = React.useState<ToastDataType>({ msg: "", show: false, type: true });

    const ToggleToast = (show: boolean, msg?: string, type?: boolean) => {
        return setToast({
            type: type ? type : toast.type,
            msg: msg ? msg : toast.msg,
            show: show,
        });
    }

    return (
        <ModalContext.Provider value={{
            ToggleToast,
            toast,
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}