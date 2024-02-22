import DashboardLayout from "@/components/dashboard-layout";
import * as React from "react";
import EditTask from "@/features/edit-task";
import ensureError from "@/lib/ensure-error";
import { TASK } from "@/types/task.types";
import { GetServerSidePropsContext } from "next";
import TasksService from "@/services/tasks.service";

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

type EditTaskPageProps = {
  task: TASK | null
  error: null | Error
}

export default function EditTaskPage({ error, task }: EditTaskPageProps) {
  return <EditTask error={error} task={task} />
}

EditTaskPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

