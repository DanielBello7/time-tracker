import React from "react";
const PREFIX = '--';

function saveCookie(key: string, value: string, expireDays: number) {
    if (typeof window !== "undefined") {
        const d = new Date();
        const time = (expireDays * 60 * 60 * 1000);
        d.setTime(d.getTime() + time);
        const expires = "expires=" + d.toUTCString();
        return document.cookie = key + "=" + value + ";" + expires + ";path=/";
    }
}

function getCookie(key: string) {
    if (typeof window !== "undefined") {
        const name = key + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const segments = decodedCookie.split(';');

        for (let i = 0; i < segments.length; i++) {
            let current = segments[i];

            while (current.charAt(0) === ' ') {
                current = current.substring(1);
            }

            if (current.indexOf(name) === 0)
                return current.substring(name.length, current.length);
        }
        return null;
    }
}

function useCookie<T>(key: string, hours: number, initialValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = React.useState<T>(() => {
        const json = getCookie(prefixedKey);
        if (json !== null && json !== undefined) {
            const result = JSON.parse(json);
            return result;
        }

        if (typeof initialValue === 'function') return initialValue();
        if (initialValue !== null || initialValue === 0) return initialValue;
        return null;
    });

    React.useEffect(() => {
        const result = JSON.stringify(value);
        saveCookie(prefixedKey, result, hours);
    }, [value, prefixedKey, hours]);

    return [value, setValue];
}

export default useCookie;