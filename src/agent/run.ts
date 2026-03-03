import 'dotenv/config'
import { openai } from '@ai-sdk/openai'
import { generateText, type ModelMessage } from 'ai'
import type { AgentCallbacks } from '../types'
import { executeTool } from './executeTools'
import { SYSTEM_PROMPT } from './system/prompt'
import { type ToolName, tools } from './tools'

const MODEL_NAME = 'gpt-5-mini'

export const runAgent = async (
	userMessage: string,
	conversationHistory?: ModelMessage[],
	callbacks?: AgentCallbacks,
) => {
	const { text, toolCalls } = await generateText({
		model: openai(MODEL_NAME),
		system: SYSTEM_PROMPT,
		prompt: userMessage,
		tools,
		toolChoice: 'auto', // auto by default
		activeTools: ['dateTime'],
	})

	for await (const tc of toolCalls) {
		const toolName = tc.toolName as ToolName
		const tcResult = await executeTool(toolName)
		console.log('tcResult: ', tcResult) //  2026-02-13T20:47:57.681Z
	}
}

runAgent('What is the current time in Denver, Colorado?')
