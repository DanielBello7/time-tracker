import { useCookies } from "react-cookie";
import React from "react";

const prefix = '--';

function useCookie<T>(key: string, hours: number, initialValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [cookies, setCookie] = useCookies();
    const prefixedKey = prefix + key;

    const [value, setValue] = React.useState<T>(() => {
        const json = cookies[prefixedKey]
        if (json !== null) {
            const result = JSON.parse(json);
            return result;
        }

        if (typeof initialValue === 'function') return initialValue();
        if (initialValue !== null || initialValue === 0) return initialValue;
        return null;
    });

    React.useEffect(() => {
        const result = JSON.stringify(value);
        setCookie(prefixedKey, result, { maxAge: 2 });
    }, [value, prefixedKey, hours]);

    return [value, setValue];
}

export default useCookie;