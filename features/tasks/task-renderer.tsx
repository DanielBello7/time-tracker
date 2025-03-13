import type { TASK } from "@/types/task.types";
import TaskItem from "./task-item";
import * as React from "react";
import { motion } from "framer-motion";
import { item as val } from "./animation"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePage } from "@/store/tasks-slice";

type TaskRendererProps = {
  tasks?: TASK[]
}

export default function TaskRenderer({ tasks = [] }: TaskRendererProps) {
  const { hasMore, page } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const observer = React.useRef<IntersectionObserver>();

  const lastElement = React.useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    if (node && parseInt(node.id) === tasks.length) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore) dispatch(updatePage(page + 1));
        })
      });
      observer.current.observe(node);
    }
  }, [observer.current, tasks.length, page, hasMore, dispatch]);

  React.useEffect(() => {
    return () => {
      observer.current?.disconnect();
    }
  }, []);

  return (
    <React.Fragment>
      {tasks.map((item, idx) => (
        <motion.div variants={val} key={idx} id={(idx + 1).toString()} ref={lastElement}>
          <TaskItem {...item} />
        </motion.div>
      ))}
    </React.Fragment>
  )
}

