import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config';
const connectCloudinary = async () => {
    try {
        console.log("Connecting to Cloudinary...");
        console.log("Cloudinary Config:", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_SECRET_KEY);
        // Validate environment variables
        const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } = process.env;
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_SECRET_KEY) {
            throw new Error("Missing required Cloudinary environment variables");
        }

        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY,
        });

        console.log("Cloudinary connected");
    } catch (error) {
        console.error("Error connecting to Cloudinary:", error.message);
        throw error;
    }
};

export default connectCloudinary;