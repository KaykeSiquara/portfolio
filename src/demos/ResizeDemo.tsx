import { ResizableArea } from '../ui/ResizableArea'
import { EntriesTable } from './EntriesTable'

export function ResizeDemo() {
  return (
    <ResizableArea>
      <EntriesTable showFilter={false} />
    </ResizableArea>
  )
}
