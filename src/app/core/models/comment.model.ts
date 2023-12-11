import { Tickets } from "./ticket.model"
import { User } from "./user.model"

export interface Comments {
  content: string
  user: User
  ticket: Tickets
  timestamp: Date
}

export interface CommentAddRequest {
  content: string
  ticket_id: number
  userEmail: string
}
