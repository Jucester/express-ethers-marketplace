import z from 'zod';

export const offersFiltersSchema = z.object({
   status: z.string().optional(),
})

export type OffersFilters = z.infer<typeof offersFiltersSchema>
