"use client"
import React from "react"
import Logo from "./logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const routes = [
	{
		label: "Dashboard",
		href: "/app/dashboard",
	},
	{
		label: "Account",
		href: "/app/account",
	},
]

export default function AppHeader() {
	const activePath = usePathname()

	return (
		<header className="flex items-center justify-between border-b border-white/10 py-2">
			<Logo />
			<nav>
				<ul className="text-md flex gap-2">
					{routes.map(route => (
						<li key={route.href}>
							<Link
								href={route.href}
								className={cn(
									"rounded-sm px-2 py-1 text-white/70 transition hover:bg-black/10 hover:text-white focus:text-white",
									route.href === activePath && "bg-black/10 text-white"
								)}>
								{route.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
