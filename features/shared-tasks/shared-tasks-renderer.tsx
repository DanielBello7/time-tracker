import type { SHARED_TASK } from "@/types/shared-task.types";
import SharedTaskItem from "./shared-task-item";
import * as React from "react";
import { motion } from "framer-motion";
import { item as val } from "./animation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateSharedTaskPage } from "@/store/tasks-slice"

type SharedTaskRendererProps = {
  docs: SHARED_TASK[]
}

export default function SharedTaskRenderer({ docs = [] }: SharedTaskRendererProps) {
  const { sharedTaskHasMore, sharedTaskPage } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const observer = React.useRef<IntersectionObserver>();

  const lastElement = React.useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    if (node && parseInt(node.id) === docs.length) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sharedTaskHasMore) dispatch(updateSharedTaskPage(sharedTaskPage + 1));
        })
      });
      observer.current.observe(node);
    }
  }, [observer.current, docs.length, sharedTaskHasMore, sharedTaskPage, dispatch]);

  React.useEffect(() => {
    return () => {
      observer.current?.disconnect();
    }
  }, []);

  return (
    <React.Fragment>
      {docs.map((item, idx) => (
        <motion.div key={item._id} variants={val} id={(idx + 1).toString()} ref={lastElement}>
          <SharedTaskItem {...item} />
        </motion.div>
      ))}
    </React.Fragment>
  )
}

