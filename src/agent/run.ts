import 'dotenv/config'
import { openai } from '@ai-sdk/openai'
import { getTracer, Laminar } from '@lmnr-ai/lmnr'
import { generateText, type ModelMessage } from 'ai'
import type { AgentCallbacks } from '../types.ts'
import { executeTool } from './executeTools.ts'
import { SYSTEM_PROMPT } from './system/prompt.ts'
import { type ToolName, tools } from './tools/index.ts'

const MODEL_NAME = 'gpt-5-mini'

Laminar.initialize({
	projectApiKey: process.env.LMNR_PROJECT_API_KEY,
})

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
		experimental_telemetry: {
			isEnabled: true,
			tracer: getTracer(),
		},
	})

	await Laminar.flush()

	for await (const tc of toolCalls) {
		const toolName = tc.toolName as ToolName
		const tcResult = await executeTool(toolName)
		console.log('tcResult: ', tcResult) //  2026-02-13T20:47:57.681Z
	}

	return []
}

// const program = async (prompt: string) => {
// 	const result = await runAgent(prompt)
// 	console.log('result: ', result)
// }

// program('when does daylight savings take place in the USA Mountain time zone?')
