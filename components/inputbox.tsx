import React from "react";

interface InputBoxProps {
    title: string,
    length: string,
    disabled?: boolean
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    id: string
    classname?: string
    type: "text" | "email" | "password"
}

function InputBox({ title, length, disabled, value, setValue, type, id, classname }: InputBoxProps) {
    return (
        <div className={`col-span-${length} sm:col-span-${length} ${classname}`}>
            <label htmlFor={id} className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {title}
            </label>

            <input
                className="border-b-4 bg-gray-50 focus:border-b-gray-400 focus:outline-0 block w-full sm:text-sm p-2 mb-4 rounded"
                onChange={(e) => setValue(e.currentTarget.value)}
                name={id}
                type={type}
                id={id}
                value={value}
                autoComplete="off"
                required
                disabled={disabled}
            />
        </div>
    )
}

export default InputBox