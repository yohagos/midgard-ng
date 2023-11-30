import { Comments } from "./comment.model"
import { User } from "./user.model"

export interface Tickets {
  id: number
  title: string
  owner: User
  includedUsers: User[]
  content: string
  createdAt: Date
  closedAt: Date
  comments: Comments[]
  status: string
  categories: string[]
  priority: string
}
