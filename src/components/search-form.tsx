"use client"

import { useSearchContext } from "@/lib/hooks"

export default function SearchForm() {
	const { searchQuery, handleChangeSearchQuery } = useSearchContext()

	return (
		<form className="h-full w-full">
			<input
				className="h-full w-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/80 hover:bg-white/30 focus:bg-white/50"
				placeholder="Search pets..."
				type="search"
				value={searchQuery}
				onChange={e => handleChangeSearchQuery(e.target.value)}
			/>
		</form>
	)
}