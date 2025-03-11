import { v } from "convex/values";
import { mutation,query } from "./_generated/server";

export const insertSelectedAssistants = mutation({
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
  handler: async (ctx, args) => {
    // Check if the user already has a record
    const existingRecord = await ctx.db
      .query("userAiAssistants")
      .filter((q) => q.eq(q.field("userId"), args.uid))
      .first();

    if (existingRecord) {
      // Update the existing record by merging the new assistants list
      await ctx.db.patch(existingRecord._id, {
        assistants: args.records,
      });
    } else {
      // Insert a new record if no existing record is found
      await ctx.db.insert("userAiAssistants", {
        userId: args.uid,
        assistants: args.records,
      });
    }
    return args.records
  },
});

export const getUserAssistants = query({
  args: {
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the user record by userId
    const userRecord = await ctx.db
      .query("userAiAssistants")
      .filter((q) => q.eq(q.field("userId"), args.uid))
      .first();

    // If no record is found, return an empty array
    if (!userRecord) {
      return [];
    }

    // Return the user's assistants
    return userRecord.assistants;
  },
});
