import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        
        const response = await fetch('http://localhost:5000/process_image', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to process image');
        }

        const data = await response.json();
        return NextResponse.json(data);
        
    } catch (error) {
        console.error("Error processing image:", error);
        return NextResponse.json({ 
            error: "Failed to process wildfire detection." 
        }, { 
            status: 500 
        });
    }
}
