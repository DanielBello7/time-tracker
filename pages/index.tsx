import { useApplicationData } from "@/context/data.context";
import { useModalData } from "@/context/modal.context";
import { useRouter } from "next/router";
import InputBox from "../components/inputbox";
import React from "react";
import AlertModal from "@/modules/alert";

enum SCREEN { REGISTER, LOGIN }
type ACTIVE_SCREEN = SCREEN.LOGIN | SCREEN.REGISTER;

interface AuthenticationSubComponentProps {
    setHide: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Authentication() {
    const [screen, setScreen] = React.useState<ACTIVE_SCREEN>(SCREEN.LOGIN);
    const [hide, setHide] = React.useState(false);
    const { isLoggedIn } = useApplicationData();
    const router = useRouter();
    const pathname = router.pathname;

    const HandleScreenChange = () => {
        if (screen === SCREEN.LOGIN) return setScreen(SCREEN.REGISTER)
        else return setScreen(SCREEN.LOGIN);
    }

    React.useLayoutEffect(() => {
        if (!isLoggedIn && pathname !== "/") router.push("/");
        if (isLoggedIn && pathname === "/") router.push("/");
    }, []);

    return (
        <React.Fragment>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-1/4">
                    {
                        screen === SCREEN.LOGIN
                            ? <LoginComponent setHide={setHide} />
                            : screen === SCREEN.REGISTER
                                ? <RegisterComponent setHide={setHide} />
                                : null
                    }
                    {
                        !hide &&
                        <div className="flex justify-between items-center font-bold uppercase text-gray-400 fs-7 mt-3">
                            <p>{screen === SCREEN.LOGIN ? "need an account?" : "got an account?"}</p>
                            <button className="uppercase hover:text-black" type="button" onClick={HandleScreenChange}>
                                {screen === SCREEN.LOGIN ? "register" : "sign in"}
                            </button>
                        </div>
                    }
                </div>
            </div>
            <AlertModal />
        </React.Fragment>
    )
}

function RegisterComponent(props: AuthenticationSubComponentProps) {
    const [fullname, setFullname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const HandleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!fullname.trim() || !email.trim() || !password.trim() || !confirm.trim()) return
        if (password !== confirm) return
        props.setHide(true);
        setIsLoading(true);

        try {

        }
        catch (error: any) {
            props.setHide(false);
            return setIsLoading(false);
        }
    }

    return (
        <form className="w-full" onSubmit={HandleSubmit}>
            <h1 className="uppercase font-bold text-2xl mb-4">sign up</h1>
            <InputBox
                setValue={setFullname}
                length="100"
                id="fullname"
                title="fullname"
                type="text"
                value={fullname}
            />

            <InputBox
                setValue={setEmail}
                length="100"
                id="email"
                title="Email"
                type="email"
                value={email}
            />

            <InputBox
                setValue={setPassword}
                length="100"
                id="password"
                title="password"
                type="password"
                value={password}
            />

            <InputBox
                setValue={setConfirm}
                length="100"
                id="confirm"
                title="confirm password"
                type="password"
                value={confirm}
            />

            <button className="w-full text-center uppercase text-sm bg-blue-500 font-bold text-white p-2 hover:opacity-50" type="submit" disabled={isLoading && true}>
                {isLoading ? "Loading..." : "submit"}
            </button>
        </form>
    )
}

function LoginComponent(props: AuthenticationSubComponentProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const { axios, setUser, setIsLoggedIn } = useApplicationData();
    const { ToggleAlert } = useModalData();

    const router = useRouter();

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) return
        props.setHide(true);
        setIsLoading(true);

        try {
            const response = await axios.post('/auth', { email, password });
            setUser(response.data.payload);
            setIsLoading(false)
            setIsLoggedIn(true);
            return router.push("/dashboard");
        }
        catch (error) {
            ToggleAlert(true, "error occrured");
            console.log('here');
            props.setHide(false);
            return setIsLoading(false);
        }
    }

    return (
        <form className="w-full" onSubmit={HandleSubmit}>
            <h1 className="uppercase font-bold text-2xl mb-2">login</h1>
            <InputBox
                setValue={setEmail}
                length="100"
                id="email"
                title="email"
                type="email"
                value={email}
                disabled={isLoading && true}
            />

            <InputBox
                setValue={setPassword}
                length="100"
                id="password"
                title="password"
                type="password"
                disabled={isLoading && true}
                value={password}
            />

            <button className="w-full text-center uppercase text-sm bg-blue-500 text-white p-2 font-bold hover:opacity-50" type="submit" disabled={isLoading && true}>
                {isLoading ? "Loading..." : "login"}
            </button>
        </form>
    )
}