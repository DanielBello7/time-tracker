import type { TASK } from "@/types/task.types";
import * as React from "react";

type ImportTaskContextProviderProps = {
  children: React.ReactNode
}

type ImportTasksContext = {
  selected: string[]
  addSelected: (value: string[]) => void
  removeSelected: (value: string[]) => void
  imported: TASK[]
  setImported: React.Dispatch<React.SetStateAction<TASK[]>>
}

const ImportTaskContext = React.createContext({} as ImportTasksContext);

export function useImportTask() {
  return React.useContext(ImportTaskContext);
}

export function ImportTasksContextProvider(props: ImportTaskContextProviderProps) {
  const [imported, setImported] = React.useState<TASK[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const addSelected = (value: string[]) => {
    const updated = Array.from(new Set([...selected, ...value]));
    return setSelected(updated);
  }

  const removeSelected = (value: string[]) => {
    const response = selected.filter((item) => !value.includes(item));
    return setSelected(response);
  }

  return (
    <ImportTaskContext.Provider value={{
      selected,
      addSelected,
      imported,
      setImported,
      removeSelected
    }}>
      {props.children}
    </ImportTaskContext.Provider>
  )
}

