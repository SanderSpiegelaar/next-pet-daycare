"use client"

import { Pet } from "@/lib/types"
import { createContext, useState } from "react"

type PetContextProviderProps = {
	data: Pet[]
	children: React.ReactNode
}

type TPetContext = {
	pets: Pet[]
	selectedPetId: string | null
	selectedPet: Pet | undefined
	numberOfPets: number
	handleChangeSelectedPetId: (id: string) => void
	handleCheckoutPet: (id: string) => void
	handleAddPet: (newPet: Omit<Pet, "id">) => void
	handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void
}

export const PetContext = createContext<TPetContext | null>(null)

export default function PetContextProvider({
	data,
	children,
}: PetContextProviderProps) {
	const [pets, setPets] = useState(data)
	const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

	const selectedPet = pets.find(pet => pet.id === selectedPetId)
	const numberOfPets = pets.length

	const handleChangeSelectedPetId = (id: string) => {
		setSelectedPetId(id)
	}

	const handleAddPet = (newPet: Omit<Pet, "id">) => {
		setPets(prev => [
			...prev,
			{
				id: Date.now().toString(),
				...newPet,
			},
		])
	}

	const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
		setPets(prev =>
			prev.map(pet => {
				if (pet.id === petId) {
					return {
						id: petId,
						...newPetData,
					}
				}
				return pet
			})
		)
	}

	const handleCheckoutPet = (id: string) => {
		setPets(prev => prev.filter(pet => pet.id !== id))
		setSelectedPetId(null)
	}

	return (
		<PetContext.Provider
			value={{
				pets,
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