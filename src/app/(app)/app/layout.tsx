import React from "react"
import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"
import BackgroundPattern from "@/components/background-pattern"
import PetContextProvider from "@/contexts/pet-context-provider"
import SearchContextProvider from "@/contexts/search-context-provider"
import { Pet } from "@/lib/types"
import db from "@/lib/db"

interface Props {
	children: React.ReactNode
}

export default async function AppLayout({ children }: Props) {
	const pets = await db.pet.findMany()

	return (
		<>
			<BackgroundPattern />
			<div className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-4">
				<AppHeader />
				<SearchContextProvider>
					<PetContextProvider data={pets}>{children}</PetContextProvider>
				</SearchContextProvider>
				<AppFooter />
			</div>
		</>
	)
}
