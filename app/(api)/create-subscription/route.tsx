import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_LIVE_KEY!,
        key_secret: process.env.RAZORPAY_SECRET_KEY!
    });

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const startAt = currentTimeInSeconds + 60; // starts 1 minute from now

    try {
        const result = await instance.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID!,
            customer_notify: 1,
            quantity: 1,
            total_count: 12,
            start_at: startAt,
            addons: [],
            notes: {
                key1: "value3",
                key2: "value2"
            }
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("⨯ Subscription creation failed:", error);
        return NextResponse.json(
            { error: error?.error?.description || "Something went wrong" },
            { status: 400 }
        );
    }
}
