import DashboardLayout from "@/components/dashboard-layout";
import SelectedSharedTask from "@/features/selected-shared-task";
import ensureError from "@/lib/ensure-error";
import TasksService from "@/services/task.service";
import * as React from "react";
import type { SHARED_TASK } from "@/types/shared-task.types";
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context
  const id = params?.id as string;
  try {
    const response = await TasksService.findSharedTaskUsingId(id);
    TasksService.updateSharedTaskStatus(id, { isRead: true });
    return {
      props: {
        task: JSON.parse(JSON.stringify(response))
      }
    }
  } catch (error) {
    const err = ensureError(error);
    return {
      props: {
        tasks: null,
        error: JSON.parse(JSON.stringify(err))
      }
    }
  }
}

type SelectedSharedTaskPageProps = {
  task: SHARED_TASK | null
  error?: Error | null
}

export default function SelectedSharedTasksPage({ task, error }: SelectedSharedTaskPageProps) {
  return <SelectedSharedTask task={task} error={error} />
}

SelectedSharedTasksPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

