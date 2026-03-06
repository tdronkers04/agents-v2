import type { Tool } from 'ai'
import { dateTime } from './dateTime.ts'

export type ToolName = 'dateTime'

// All tools combined for the agent
export const tools: Record<ToolName, Tool> = {
	dateTime,
}
