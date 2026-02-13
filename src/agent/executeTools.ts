import type { Tool } from 'ai'
import { tools } from './tools'

export const executeTool = async (name: string, args?: any) => {
	const tool: Tool = tools[name]

	if (!tool) {
		return 'Unknown tool!'
	}

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
