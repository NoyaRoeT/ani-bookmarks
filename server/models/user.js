import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		avatarUrl: String,
	},
	{ timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);
export default User;
