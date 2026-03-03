import type { Tool } from 'ai'
import { type ToolName, tools } from './tools'

export const executeTool = async (name: ToolName, args?: any) => {
	const tool: Tool = tools[name]

	const execute = tool.execute

	if (!execute) {
		return `Undefined execute function for tool: ${name}`
	}

	const result = await execute(args, {
		toolCallId: '',
		messages: [],
	})

	return String(result)
}
