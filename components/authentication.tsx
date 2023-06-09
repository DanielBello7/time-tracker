import InputBox from "./inputbox";
import React from "react";

enum SCREEN { REGISTER, LOGIN }
type ACTIVE_SCREEN = SCREEN.LOGIN | SCREEN.REGISTER;

export default function Authentication() {
    const [screen, setScreen] = React.useState<ACTIVE_SCREEN>(SCREEN.REGISTER);
    return (
        <div className="border border-red-500 w-full h-screen flex items-center justify-center">
            <div className="w-1/4 border border-black">
                {
                    screen === SCREEN.LOGIN
                        ? <LoginComponent />
                        : screen === SCREEN.REGISTER
                            ? <RegisterComponent />
                            : null
                }
            </div>
        </div>
    )
}

function RegisterComponent() {
    const [fullname, setFullname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const HandleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!fullname.trim() || !email.trim() || !password.trim() || !confirm.trim()) return
        if (password !== confirm) return
        setIsLoading(true);

        try {

        }
        catch (error: any) {
            return setIsLoading(false);
        }
    }

    return (
        <form className="w-full" onSubmit={HandleSubmit}>
            <h1 className="uppercase font-bold text-2xl mb-2">sign up</h1>
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

            <button className="w-full text-center uppercase text-sm bg-blue-300 text-white p-3 hover:opacity-50" type="submit" disabled={isLoading && true}>
                {isLoading ? "Loading..." : "submit"}
            </button>
        </form>
    )
}

function LoginComponent() {
    return (
        <div className="w-full">

        </div>
    )
}