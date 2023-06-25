import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import Avatar from "./Avatar";

const MenuDropdown = () => {
	const { user, logOut } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	// const toggleOpen = useCallback(() => {
	// 	setIsOpen((value) => !value);
	// }, []);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
					AirCNC Home
				</div>
				{/* Droupdown Menu */}
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="p-4 md:px-4 md:py-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
					{isOpen ? (
						<HiOutlineX className="h-6 w-6" />
					) : (
						<AiOutlineMenu className="h-6 w-6" />
					)}
					<div className="hidden md:block">
						<Avatar />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 md:top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						<Link
							to="/"
							className="block md:hidden px-4 py-3 hover:text-rose-500 hover:bg-neutral-100 transition font-semibold">
							Home
						</Link>
						{user ? (
							<div
								onClick={logOut}
								className="px-4 py-3 hover:text-rose-500  hover:bg-neutral-100 transition font-semibold cursor-pointer">
								Logout
							</div>
						) : (
							<>
								<Link
									onClick={() => setIsOpen(false)}
									to="/login"
									className="px-4 py-3 hover:text-rose-500 hover:bg-neutral-100 transition font-semibold">
									Login
								</Link>
								<Link
									onClick={() => setIsOpen(false)}
									to="/signup"
									className="px-4 py-3 hover:text-rose-500 hover:bg-neutral-100 transition font-semibold">
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default MenuDropdown;
