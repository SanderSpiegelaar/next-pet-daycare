import { Button } from "./ui/button"

type PetFormButtonProps = {
	actionType: "add" | "edit"
}

export default function PetFormButton({ actionType }: PetFormButtonProps) {
	return (
		<Button
			className="mt-5 self-end"
			type="submit">
			{actionType === "add" ? "Add a new pet" : "Edit pet"}
		</Button>
	)
}
