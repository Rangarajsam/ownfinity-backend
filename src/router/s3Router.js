import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../config/dev.env') });

const router = express.Router();

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing required AWS environment variables.");
}

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

router.post('/s3/signedUrl', auth, async (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const size = req.body.size;
    const checksum = req.body.checksum;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const generateRandomFileName = (hash=32) => crypto.randomBytes(hash).toString('hex');
    const maxSize = 11024 * 1024 * 2; // 2MB
    const acceptedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!acceptedTypes.includes(type)) {
        return res.status(400).send("This file type is not allowed");
    }
    if (req.body.size > maxSize) {
        return res.status(400).send("This file size is not allowed");
    }
    const fileName = `${name.replace(/\s/g,'')}-${generateRandomFileName()}.${type.split('/')[1]}`;
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum
    });

    try {
        const url = await getSignedUrl(s3,command, { expiresIn: 3600 });
        res.status(200).send({url});
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw error;
    }
});

export default router;



