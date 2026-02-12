import 'dotenv/config'
import { openai } from '@ai-sdk/openai'
import { generateText, type ModelMessage } from 'ai'
import type { AgentCallbacks } from '../types'
import { SYSTEM_PROMPT } from './system/prompt'

const MODEL_NAME = 'gpt-5-mini'

export const runAgent = async (
	userMessage: string,
	conversationHistory?: ModelMessage[],
	callbacks?: AgentCallbacks,
) => {
	const { text } = await generateText({
		model: openai(MODEL_NAME),
		system: SYSTEM_PROMPT,
		prompt: userMessage,
	})
	console.log(text)
}

runAgent('tell me about yourself. what kind of data were you trained on?')
