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

// 2. NULL TYPES
// null is a primitive value that represents the intentional absence of any object value.
if (messages !== null) {
  // ...
}

// 3. FUNCTION TYPES
// A function type allows you to specify the exact form a function should take: the types of its input arguments and its return type.

// type IMessage = { name: string; description: string }

type MapCallback = (message: IMessage) => void
const logMessage: MapCallback = (message) => {
  console.log(`Message ID: ${message.id}`)
}

messages.map((message: IMessage) => {
  logMessage(message)
})

// const SomethingSweet: string
type SomethingSweet = { name: string; model: string }

type hamah = (message: SomethingSweet) => void

// 4. CREATING TYPES FROM OTHER TYPES
// 4.1. UTILITY TYPES
// Pick<Type, Keys>

interface IUser {
  id: number
  name: string
  email: string
}

// Pick, Record, Partial, Required, Omit, ReadOnly = PPRRRO

type UserPreview = Pick<IUser, 'id' | 'name'>
const userPreview: UserPreview = { id: 1, name: 'John' }

type UserNamesById = Record<IUser['id'], string>
const userNamesById: UserNamesById = { 1: 'John', 2: 'Alice' }

type PartialIUser = Partial<IUser>
const partialIUser: PartialIUser = { id: 1 }

type RequiredIUser = Required<PartialIUser>
const requiredIUser: RequiredIUser = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
}

type UserWithoutEmail = Omit<IUser, 'email'>
const userWithoutEmail: UserWithoutEmail = { id: 1, name: 'Alice' }

type ReadOnlyIUser = Readonly<IUser>
const readonlyIUser: ReadOnlyIUser = {
  id: 1,
  name: 'Sugar',
  email: 'sugar@gmail.com',
}

// UNION TYPES
type MessageType = 'user' | 'system'

interface IMessage {
  type: MessageType
}

type DbChatSuccessResponse = {
  success: true
  data: IChat
}

type DbChatErrorResponse = {
  success: false
  error: string
}

type DBResponse = DbChatSuccessResponse | DbChatErrorResponse

function getChatFromDb(chatId: string): DBResponse {
  const findChatById = (_: string) => ({} as IChat)
  const chat = findChatById(chatId)
  if (chat) {
    return {
      success: true,
      data: chat,
    }
  } else {
    return {
      success: false,
      error: 'Chat not found in the database',
    }
  }
}

// TYPE INTERSECTIONS
// A feature that creates a new type that includes all properties of combined types.

type IDBEntityWithId = {
  id: number
}

type IChatEntity = {
  name: string
}

type IChatEntityWithId = IDBEntityWithId & IChatEntity

const chatEntity: IChatEntityWithId = {
  id: 1,
  name: 'Typescript tutor',
}

// INTERFACE AND OOP FEATURES

// INTERFACE
interface IMessageWithType extends IMessage {
  type: MessageType
  id: number
  chatId: number
  userId: number
  content: string
  createdAt: Date
}

const userMessage: IMessageWithType = {
  id: 10,
  chatId: 2,
  userId: 1,
  content: 'Hello, world!',
  createdAt: new Date(),
  type: 'user',
}

// OOP FUNCTIONALITIES
// 1. Polymorphism: objects of subclasses to be treated as objects of a common superclass. Achieved through interfaces and abstract classes
// 2. Abstraction:
// 3. Inheritance
// 4. Encapsulation
// 4.1. public ~ default access level for class members
// 4.2. private ~ can be accessed from within the class only
// 4.3. protected ~ can be accessed from within the class and subclasses

abstract class AbstractDatabaseResource {
  constructor(protected resourceName: string) {}

  protected logResource(resource: { id: number }): void {
    console.log(`[${this.resourceName}] Resource logged:`, resource)
  }

  abstract get(id: number): { id: number } | null
  abstract getAll(): { id: number }[]
  abstract addResource(resource: { id: number }): void
}

const inMemoryChatResource = new InMemoryChatResource()
const chat1: IChat = {
  id: 1,
  ownerId: 2,
  messages: [],
}

inMemoryChatResource.addResource(chat1)
const retrievedChat1 = inMemoryChatResource.get(1)

// GENERICS
function printValue<T>(value: T): void {
  console.log(value)
}
printValue<number>(123)
printValue<string>('HelloWorld!')
