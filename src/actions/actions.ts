"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { PetEssentials } from "@/lib/types"
import { Pet } from "@prisma/client"
import { petFormSchema } from "@/lib/validations"

export async function addPet(pet: PetEssentials) {
	const parsedPet = petFormSchema.safeParse(pet)
	if (!parsedPet.success) return { message: "Invalid data" }

	try {
		const createdPet = await db.pet.create({
			data: {
				...parsedPet.data,
				notes: parsedPet.data.notes!,
			},
		})
	} catch (error) {
		return {
			message: "Could not add pet",
		}
	}

	revalidatePath("/app", "layout")
}

export async function updatePet(petId: Pet["id"], newPetData: PetEssentials) {
	try {
		const updatedPet = await db.pet.update({
			where: {
				id: petId,
			},
			data: newPetData,
		})
	} catch (error) {
		return {
			message: "Could not update pet",
		}
	}

	revalidatePath("/app", "layout")
}

export async function deletePet(petId: Pet["id"]) {
	try {
		const deletedPet = await db.pet.delete({ where: { id: petId } })
	} catch (error) {
		return {
			message: "Could not update pet",
		}
	}

	revalidatePath("/app", "layout")
}
