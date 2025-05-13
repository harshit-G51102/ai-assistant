import { defineSchema, defineTable } from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        credits:v.number(),
        orderId:v.optional(v.string())
    }),
    userAiAssistants: defineTable({
        userId: v.string(),
        assistants: v.array(
          v.object({
            id: v.number(),
            name: v.string(),
            title: v.string(),
            image: v.string(),
            instruction: v.string(),
            userInstruction: v.string(), 
            sampleQuestions: v.array(v.string()),
            credits:v.number()
          })
        )
      })
})
