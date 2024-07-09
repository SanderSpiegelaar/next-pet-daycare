"use client"

import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import React from "react"
import { usePetContext } from "@/lib/hooks"

type PetFormProps = {
	actionType: "add" | "edit"
	onFormSubmission: () => void
}

export default function PetForm({
	actionType,
	onFormSubmission,
}: PetFormProps) {
	const { handleAddPet, selectedPet, handleEditPet } = usePetContext()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const newPet = {
			name: formData.get("name") as string,
			ownerName: formData.get("ownerName") as string,
			imageUrl:
				(formData.get("imageUrl") as string) ||
				"https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
			age: +(formData.get("age") as string),
			notes: formData.get("notes") as string,
		}
		if (actionType === "add") handleAddPet(newPet)
		if (actionType === "edit") handleEditPet(selectedPet!.id, newPet)
		onFormSubmission()
	}

	return (
		<form
			className="flex flex-col"
			onSubmit={handleSubmit}>
			<div className="space-y-3">
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						defaultValue={actionType === "edit" ? selectedPet?.name : ""}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="ownerName">Owner Name</Label>
					<Input
						id="ownerName"
						name="ownerName"
						type="text"
						defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="imageUrl">Image URL</Label>
					<Input
						id="imageUrl"
						name="imageUrl"
						type="text"
						defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="age">Age</Label>
					<Input
						id="age"
						name="age"
						type="number"
						defaultValue={actionType === "edit" ? selectedPet?.age : ""}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="Notes">Notes</Label>
					<Textarea
						id="notes"
						name="notes"
						rows={5}
						defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
						required
					/>
				</div>
			</div>
			<Button
				className="mt-5 self-end"
				type="submit">
				{actionType === "add" ? "Add a new pet" : "Edit pet"}
			</Button>
		</form>
	)
}
