import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser=mutation({
    args:{
        name:v.string(), 
        email:v.string(),
        picture:v.string()

    },
    handler:async(ctx,args)=>{
        const user=await ctx.db.query('users').filter(q=>q.eq(q.field('email'),args.email)).collect();

        if(user?.length==0){ 
            const data={
                name:args.name,
                email:args.email,
                picture:args.picture,
                credits:5000
            }
            const result=await ctx.db.insert('users',data);
            return data;
        }

        return user[0];


    }
})


export const GetUserInfo=query({
    args:{
        email:v.string()
    },
    handler:async(ctx,args)=>{
        const user=await ctx.db.query('users').filter(q=>q.eq(q.field('email'),args.email)).collect();
        return user[0];
 
    }
})


export const UpdateTokens = mutation({
  args: {
    credits: v.number(),
    uid: v.id("users"),
    orderId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.uid, {
      credits: args.credits,
      orderId: args.orderId
    });
  }
});
