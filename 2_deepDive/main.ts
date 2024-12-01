// Advanced Typing Techniques
// 1. narrowing
// 2. null types
// 3. function types
// 4. utility types = partial, readonly, required, pick, record, omit

// 1. NARROWING
// The process of moving from a less precise type to a more precise type. For instanceof, a variable that initially has a type of any or unknown can be narrowed down to more specific types such as string, number or custom types.

function narrowToNumber(value: unknown): number {
  if (typeof value !== 'number') {
    throw new Error('Value is not a number')
  }
  return value
}

async function getChatMessagesWithNarrowing(
  chatId: unknown,
  req: { authorization: string }
) {
  const authToken = req.authorization
  const numberChatId = narrowToNumber(chatId)
  const messages = await chatService.getChatMessages(numberChatId, authToken)
  if (messages !== null) {
    messages.map((message) => {
      console.log(
        `Message ID: ${message.id}, Feedback: ${
          message.feedback?.trim() ?? 'no feedback'
        }`
      )
    })
    return { success: true, messages }
  } else {
    return { success: false, message: 'Chat not found or access denied' }
  }
}


// 2. Null Types
