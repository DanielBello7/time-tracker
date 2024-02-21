import { useImportTask } from "./context";
import TaskItem from "./task-item";
import classNames from "classnames";

export default function ImportRenderer() {
  const { imported } = useImportTask();
  const grid = classNames({
    "w-full mt-5 grid grid-cols-1": true,
    "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": true,
    "gap-1 gap-4 md:gap-2 lg:gap-2 content-start": true
  });

  return (
    <div className={grid}>
      {imported.map((item) => (
        <TaskItem {...item} key={item._id} />
      ))}
    </div>
  )
}

