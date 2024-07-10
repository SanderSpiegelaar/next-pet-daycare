"use client"

import { addPet, deletePet, updatePet } from "@/actions/actions"
import { PetEssentials } from "@/lib/types"
import { Pet } from "@prisma/client"
import { createContext, startTransition, useOptimistic, useState } from "react"
import { toast } from "sonner"

type PetContextProviderProps = {
	data: PetEssentials[]
	children: React.ReactNode
}

type TPetContext = {
	pets: Pet[]
	selectedPetId: Pet["id"] | null
	selectedPet: Pet | undefined
	numberOfPets: number
	handleChangeSelectedPetId: (id: Pet["id"]) => Promise<void>
	handleCheckoutPet: (id: Pet["id"]) => Promise<void>
	handleAddPet: (newPet: PetEssentials) => Promise<void>
	handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => void
}

export const PetContext = createContext<TPetContext | null>(null)

export default function PetContextProvider({
	data,
	children,
}: PetContextProviderProps) {
	const [optimisticPets, setOptimisticPets] = useOptimistic(
		data,
		(state, { action, data }) => {
			switch (action) {
				case "add":
					return [...state, { ...data, id: Math.random().toString() }]
				case "edit":
					return state.map(pet => {
						if (pet.id === data.id) {
							return { ...pet, ...data.newPetData }
						}
						return pet
					})
				case "delete":
					return state.filter(pet => pet.id !== data.id)
				default:
					return state
			}
		}
	)
	const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

	const selectedPet = optimisticPets.find(pet => pet.id === selectedPetId)
	const numberOfPets = optimisticPets.length

	const handleChangeSelectedPetId = (id: Pet["id"]) => {
		setSelectedPetId(id)
	}

	const handleAddPet = async (newPet: PetEssentials) => {
		setOptimisticPets({ action: "add", data: newPet })
		const error = await addPet(newPet)
		if (error) return toast.error(error?.message)
	}

	const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
		setOptimisticPets({ action: "edit", data: { id: petId, newPetData } })
		const error = await updatePet(petId, newPetData)
		if (error) return toast.error(error.message)
	}

	const handleCheckoutPet = async (petId: Pet["id"]) => {
		setOptimisticPets({ action: "delete", data: { id: petId } })
		await deletePet(petId)
		setSelectedPetId(null)
	}

	return (
		<PetContext.Provider
			value={{
				pets: optimisticPets,
				selectedPetId,
				selectedPet,
				numberOfPets,
				handleChangeSelectedPetId,
				handleCheckoutPet,
				handleAddPet,
				handleEditPet,
			}}>
			{children}
		</PetContext.Provider>
	)
}
