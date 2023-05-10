const Login = ({ onLogin, email, password }) => {
	return (
		<div className="h-screen flex justify-center items-center">
			<form
				className="flex flex-col my-3 mx-2 space-y-4 w-3/6"
				onSubmit={onLogin}
			>
				<div className="flex flex-col space-y-2">
					<label htmlFor="email">Email</label>
					<input
						className="text-lg py-1 pl-2"
						type="text"
						id="email"
						placeholder="Email"
						ref={email}
					/>
				</div>

				<div className="flex flex-col space-y-2">
					<label htmlFor="password">Password</label>
					<input
						className="text-lg py-1 pl-2"
						type="text"
						id="password"
						placeholder="Password"
						ref={password}
					/>
				</div>

				<button className="mt-4 p-2 tracking-wide text-[#f9d3b4] bg-[#1f2123] border-[#b89579] border-2 border-solid">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
