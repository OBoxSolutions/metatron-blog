/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ["images.unsplash.com", "unsplash.com", "firebasestorage.googleapis.com"],
    },
};

export default nextConfig;
