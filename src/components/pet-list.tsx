"use client"
import { usePetContext, useSearchContext } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"

export default function PetList() {
	const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext()
	const { searchQuery } = useSearchContext()

	const filteredPets = pets.filter(pet =>
		pet.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<ul className="border-light border-b bg-white">
			{filteredPets.map(pet => (
				<li key={pet.id}>
					<button
						className={cn(
							"flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]",
							pet.id === selectedPetId && "bg-[#EFF1F2]"
						)}
						onClick={() => handleChangeSelectedPetId(pet.id)}>
						<Image
							src={pet.imageUrl}
							alt="Pet Image"
							width={45}
							height={45}
							className="h-[45px] w-[45px] rounded-full object-cover"
						/>
						<span className="font-semibold">{pet.name}</span>
					</button>
				</li>
			))}
		</ul>
	)
}
