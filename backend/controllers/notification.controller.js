import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		const notifications = await Notification.find({ to: userId }).populate({
			path: "from",
			select: "username profileImg",
		});

		await Notification.updateMany({ to: userId }, { read: true });

		res.status(200).json(notifications);
	} catch (error) {
		console.log("Error in getNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const createNotifications = async (req, res) => {
	try {
		const { type, to } = req.body;
		const user = req.user;

		const notification = new Notification({
				type,
				from: user._id,
				to: to,
			});
		await notification.save();

		res.status(200);
	} catch (error) {
		console.log("Error in createNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
