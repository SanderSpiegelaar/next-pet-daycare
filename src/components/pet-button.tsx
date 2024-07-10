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
import { flushSync } from "react-dom"

type PetButtonProps = {
	children?: React.ReactNode
	className?: string
	disabled?: boolean
	actionType: "edit" | "checkout" | "add"
	onClick?: () => void
}

export default function PetButton({
	children,
	actionType,
	className,
	disabled,
	onClick,
}: PetButtonProps) {
	const [isFormOpen, setIsFormOpen] = useState(false)

	if (actionType === "checkout") {
		return (
			<Button
				variant="secondary"
				disabled={disabled}
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
						disabled={disabled}
						onClick={onClick}>
						<PlusIcon className="h-6 w-6" />
					</Button>
				:	<Button
						variant="secondary"
						disabled={disabled}
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
					onFormSubmission={() => {
						flushSync(() => setIsFormOpen(false))
					}}
				/>
			</DialogContent>
		</Dialog>
	)
}
