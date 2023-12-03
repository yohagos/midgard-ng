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

export interface TicketCreateRequest{
  title: string,
  ownerEmail: string,
  includedUsers: User[],
  content: string,
  status: string,
  categories: string[],
  priority: string
}
