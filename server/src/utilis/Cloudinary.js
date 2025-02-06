import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: 'dw3kkrbcz', 
    api_key: 438999526985944, 
    api_secret: 'x-jccjbzieiQoBwD26x-EEqVzsw'
  });


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary };
