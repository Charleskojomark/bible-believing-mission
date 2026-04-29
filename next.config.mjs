/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                // Cloudflare R2 public bucket
                protocol: 'https',
                hostname: 'pub-359969af064541a49f8428323cf549e3.r2.dev',
            },
        ],
    },
};

export default nextConfig;
