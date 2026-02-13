import type { Tool } from 'ai'
import { dateTime } from './dateTime'

// All tools combined for the agent
export const tools: Record<string, Tool> = {
	dateTime,
}
