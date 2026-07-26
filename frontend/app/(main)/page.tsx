import { LearningPath } from "@/components/features/learn"
import { RightSidebar } from "@/components/features/sidebar"
import { MainContent, SidebarSlot } from "@/components/layout"

export default function Page() {
  return (
    <>
      <MainContent>
        <LearningPath />
      </MainContent>

      <SidebarSlot>
        <RightSidebar />
      </SidebarSlot>
    </>
  )
}
