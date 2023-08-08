import path from 'path';
import Jimp from 'jimp';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UploadImageToServer = async (files, fileLastName)=>{
    try {
        // Convert Base64 to Buffer
        const imgBuffer = Buffer.from(files, 'base64')
        const imgName = `IMG-${Data.now()}.${fileLastName}`;
        const imgPath = `${__dirname}/../../assets/images/${imgName}`;

        // Convert image to JPEG format using sharp
        const jpegBuffer = await sharp(imgBuffer).toBuffer();
        const image = await Jimp.read(jpegBuffer);
        if(!image) {
            return "Error Convert files"
        }
        image.write(imgPath);
        return imgName;
    } catch (error) {
        console.log(error);
        return ""
    }
}

export default UploadImageToServer;