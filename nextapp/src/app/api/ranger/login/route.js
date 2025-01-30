import dbConnect from "@/lib/db";
import Ranger from "@/models/ranger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate ranger credentials
    await dbConnect();
    const ranger = await Ranger.findOne({ email: email });
    // console.log(ranger)
    if (!ranger) {
        console.log("Ranger not found");
      return new Response(JSON.stringify({ message: "Ranger not found.", success: false }), { status: 404 });
    }

    // const passwordMatch = await bcrypt.compare(password, ranger.password);
    // if (!passwordMatch) {
    //     console.log("invalid passeord")
    //   return new Response(
    //     JSON.stringify({ message: "Incorrect password.", success: false }),
    //     { status: 401 }
    //   );
    // }

    // Set ranger as verified
   
    // await ranger.save();

    // Generate JWT
    const token = jwt.sign({ rangerId: ranger._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return new Response(JSON.stringify({ message: "Internal server error.", success: false }), { status: 500 });
  }
}