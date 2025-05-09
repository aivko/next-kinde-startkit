import ImageKit from "imagekit";

export const authenticator =  async () => {
    try {
        const imagekit = new ImageKit({
            publicKey: "public_3KePOhstCduL+PbBlMhQP3xbLyw=",
            privateKey : "private_ZGKnOmD8+jBaTXWGm2GrHCw0zgk=",
            urlEndpoint: "https://ik.imagekit.io/gjo0mtzlyq",
        });

        const getCredentials = () => {
            return new Promise((resolve,reject)=>{
                resolve(imagekit.getAuthenticationParameters())
            })
        };

        const data = await getCredentials();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

export const purgeCache = async (fileUrl: string) => {
    try {
        const response = await fetch("https://api.imagekit.io/v1/files/purge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa("private_ZGKnOmD8+jBaTXWGm2GrHCw0zgk=:")}`,
            },
            body: JSON.stringify({ url: fileUrl }),
        });

        if (response.ok) {
            await response.json();
        }
    } catch (error) {
        console.error("Error purging cache:", error);
    }
};
