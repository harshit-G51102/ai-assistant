import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const insertSelectedAssistants=mutation({
    args: {
        uid: v.string(),
        records: v.array(
          v.object({
            id: v.number(),
            name: v.string(),
            title: v.string(),
            image: v.string(),
            instruction: v.string(),
            userInstruction: v.string(),
            sampleQuestions: v.array(v.string())
          })
        )
      },
    handler:async(ctx,args)=>{
        await ctx.db.insert('userAiAssistants', {
            userId: args.uid,
            assistants: args.records
          });
    }
})