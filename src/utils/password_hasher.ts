import argon2 from 'argon2'

export const hash_password = async (password: string): Promise<string> => {
    try {
        const hash: string = await argon2.hash(password, {
            type: argon2.argon2id,
            timeCost: 3,
            memoryCost: 2 ** 16,
            parallelism: 1
        })
        return hash
    } catch (error) {
        console.error("Error hashing password", error)
        throw new Error("Failed to hash password")
    }
}

export const verify_password = async (hash: string, password: string): Promise<boolean> => {
    try {
        return await argon2.verify(hash, password)
    } catch (error) {
        console.error("Failed to verify password", error)
        return false
    }
}