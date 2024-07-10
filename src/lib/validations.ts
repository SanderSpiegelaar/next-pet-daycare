import { z } from "zod"
import { DEFAULT_PET_IMAGE } from "./contants"

export const petFormSchema = z
	.object({
		name: z.string().min(1, { message: "Name is required" }),
		ownerName: z.string().min(1, { message: "Owner Name is required" }),
		imageUrl: z.union([z.literal(""), z.string().url().optional()]),
		age: z.coerce.number().int().positive("Age must be a positive number"),
		notes: z
			.string()
			.max(500, { message: "Notes must be less than 500 characters" })
			.optional(),
	})
	.transform(data => ({
		...data,
		imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
		notes: data.notes === undefined ? null : data.notes,
	}))

export type TPetForm = z.infer<typeof petFormSchema>
