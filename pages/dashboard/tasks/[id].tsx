import DashboardLayout from "@/components/dashboard-layout";
import SelectedTask from "@/features/selected-task";
import ensureError from "@/lib/ensure-error";
import TasksService from "@/services/tasks.service";
import type { TASK } from "@/types/task.types";
import { GetServerSidePropsContext } from "next";
import * as React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context
  const id = params?.id as string;
  try {
    const response = await TasksService.findTaskUsingId(id);
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

type SelectedTaskPageProps = {
  task: TASK | null
  error: null | Error
}

export default function SelectedTaskPage({ task, error }: SelectedTaskPageProps) {
  return <SelectedTask task={task} error={error} />
}

SelectedTaskPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

