import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const R2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID || "dummy"}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "dummy",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "dummy",
    },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL!;

export async function uploadToR2(
    key: string,
    body: Buffer | Uint8Array,
    contentType: string
): Promise<string> {
    await R2.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: body,
            ContentType: contentType,
        })
    );
    return `${PUBLIC_URL}/${key}`;
}

export async function deleteFromR2(key: string): Promise<void> {
    await R2.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

export { R2 };
