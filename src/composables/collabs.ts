import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { groupedProfilesQuery, type Projects, type TasksWithProjects } from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (ids: string[]) => {
    const { data, error } = await groupedProfilesQuery(ids)

    if (error) {
      console.error('Error fetching profiles:', error)
      return []
    }

    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter(
      (item) => item.collaborators && item.collaborators.length > 0,
    )

    const promises = filteredItems
      .filter((item) => {
        return item.collaborators.length
      })
      .map((item) => {
        return getProfilesByIds(item.collaborators)
      })

    const results = await Promise.all(promises)

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index] || []
    })
  }

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs,
  }
}
