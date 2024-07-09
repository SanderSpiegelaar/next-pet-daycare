"use client"

import React, { useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog"

import { Button } from "./ui/button"
import PetForm from "./pet-form"

type PetButtonProps = {
	children?: React.ReactNode
	className?: string
	actionType: "edit" | "checkout" | "add"
	onClick?: () => void
}

export default function PetButton({
	children,
	actionType,
	className,
	onClick,
}: PetButtonProps) {
	const [isFormOpen, setIsFormOpen] = useState(false)

	if (actionType === "checkout") {
		return (
			<Button
				variant="secondary"
				onClick={onClick}>
				{children}
			</Button>
		)
	}
	return (
		<Dialog
			open={isFormOpen}
			onOpenChange={setIsFormOpen}>
			<DialogTrigger asChild>
				{actionType === "add" ?
					<Button
						size="icon"
						onClick={onClick}>
						<PlusIcon className="h-6 w-6" />
					</Button>
				:	<Button
						variant="secondary"
						onClick={onClick}>
						{children}
					</Button>
				}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{actionType === "add" ? "Add a new pet" : "Edit pet"}
					</DialogTitle>
				</DialogHeader>
				<PetForm
					actionType={actionType === "add" ? "add" : "edit"}
					onFormSubmission={() => setIsFormOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	)
}
