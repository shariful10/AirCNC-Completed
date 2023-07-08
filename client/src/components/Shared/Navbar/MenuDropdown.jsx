import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import Avatar from "./Avatar";
import HostRequestModal from "../../Modal/HostRequestModal";
import { becomeHost } from "../../../API/auth";
import { toast } from "react-hot-toast";

const MenuDropdown = () => {
	const { user, logOut, role, setRole } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [modal, setModal] = useState(false);

	const modalHandler = (email) => {
		becomeHost(email).then((data) => {
			console.log(data);
			toast.success(`${user.displayName} You Are Host Now, Post Rooms!`);
			setRole("host");
			closeModal();
		});
	};

	const closeModal = () => {
		setModal(false);
	};

	// const toggleOpen = useCallback(() => {
	// 	setIsOpen((value) => !value);
	// }, []);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer">
					{!role && (
						<button
							onClick={() => setModal(true)}
							title={!user && "You Have To Login First"}
							disabled={!user}
							className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 rounded-full"
						>
							AirCNC Home
						</button>
					)}
				</div>
				{/* Droupdown Menu */}
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="p-4 md:px-4 md:py-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
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
							className="block md:hidden px-4 py-3 hover:text-rose-500 hover:bg-neutral-100 transition font-semibold"
						>
							Home
						</Link>
						{user ? (
							<>
								<Link
									onClick={() => setIsOpen(false)}
									to="/dashboard"
									className="px-4 py-3 hover:text-rose-500 hover:bg-neutral-100 transition font-semibold"
								>
									Dashboard
								</Link>
								<div
									onClick={() => {
										logOut();
										setRole(null);
										setIsOpen(false);
									}}
									className="px-4 py-3 hover:text-rose-500  hover:bg-neutral-100 transition font-semibold cursor-pointer"
								>
									Logout
								</div>
							</>
						) : (
							<>
								<Link
									onClick={() => setIsOpen(false)}
									to="/login"
									className="px-4 py-3 hover:text-rose-500 hover:bg-neutral-100 transition font-semibold"
								>
									Login
								</Link>
								<Link
									onClick={() => setIsOpen(false)}
									to="/signup"
									className="px-4 py-3 hover:text-rose-500 hover:bg-neutral-100 transition font-semibold"
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			)}
			<HostRequestModal
				email={user?.email}
				isOpen={modal}
				modalHandler={modalHandler}
				closeModal={closeModal}
			/>
		</div>
	);
};

export default MenuDropdown;
