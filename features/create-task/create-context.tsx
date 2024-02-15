import * as React from "react";

type CreateTaskContextType = {
  type: string,
  setType: (text: "bug" | "story") => void
  title: string
  setTitle: (text: string) => void
  body: string
  setBody: (text: string) => void
  tags: string[]
  setTags: (text: string[]) => void
}

type CreateTaskContextProviderProps = {
  children: React.ReactNode
}

const CreateTaskContext = React.createContext({} as CreateTaskContextType);

export function useCreateTask() {
  return React.useContext(CreateTaskContext);
}

export function CreateTaskContextProvider(props: CreateTaskContextProviderProps) {
  const [type, setType] = React.useState<"bug" | "story">("bug");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  return (
    <CreateTaskContext.Provider value={{
      type,
      setType,
      title,
      setTitle,
      body,
      setBody,
      tags,
      setTags
    }}>
      {props.children}
    </CreateTaskContext.Provider>
  )
}

