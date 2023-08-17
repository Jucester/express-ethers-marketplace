import zod from 'zod'

export const UserEntity = zod.object({
    id: zod.string(),
    name: zod.string(),
    email: zod.string(),
    password: zod.string(),
    wallet: zod.string(),
});

export type User = zod.infer<typeof UserEntity>;