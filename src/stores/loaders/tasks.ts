import {
  taskQuery,
  tasksWithProjectsQuery,
  updateTaskQuery,
  type Task,
  type TasksWithProjects,
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useErrorStore } from '../error'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)
  const loadTask = useMemoize(async (id: string) => await taskQuery(id))

  const validateCache = ({
    ref,
    query,
    key,
    loaderFn,
  }: {
    ref: typeof tasks | typeof task
    query: typeof tasksWithProjectsQuery | typeof taskQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTask
  }) => {
    const finalQuery = typeof query === 'function' ? query(key) : query

    if (ref.value) {
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(data) !== JSON.stringify(ref.value)) {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getTasks = async () => {
    const { data, error } = await loadTasks('tasks-with-projects')

    if (error) {
      console.error('Error loading tasks:', error)
    }

    if (data) tasks.value = data
    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks-with-projects',
      loaderFn: loadTasks,
    })
  }

  const getTask = async (id: string) => {
    const { data, error, status } = await loadTask(id)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
      console.error('Error fetching projects:', error)
    }

    task.value = data
    validateCache({ ref: task, query: taskQuery, key: id, loaderFn: loadTask })
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, projects, ...taskProperties } = task.value

    await updateTaskQuery(taskProperties, id)
  }

  return {
    tasks,
    getTasks,
    getTask,
    task,
    updateTask,
  }
})
