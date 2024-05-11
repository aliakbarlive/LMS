import { Request, Response } from "express";
import Address from "../../models/address/addressModel";
import { User } from "../../models/User/user.model";
const userTestId = "6593beaac2d7ee67a75fb248";

export const addOrUpdateAddress = async (req: Request, res: Response) => {
  //   const { userId } = req;
  const userId = userTestId;
  const { type, addressLine1, addressLine2, city, state, postalCode, country } =
    req.body;

  // Find the user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Check if an address for the user already exists
  let address = await Address.findOne({ user: userId });

  if (address) {
    // If an address exists, update it
    address.type = type;
    address.addressLine1 = addressLine1;
    address.addressLine2 = addressLine2;
    address.city = city;
    address.state = state;
    address.postalCode = postalCode;
    address.country = country;

    await address.save();
  } else {
    // If no address exists, create a new one
    address = new Address({
      type,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      user: userId, // Assign the reference to the user
    });

    await address.save();
  }

  res.json({ user, address, message: "Address added/updated successfully." });
};

export const getUserAddress = async (req: Request, res: Response) => {
  //   const { userId } = req;
  const userId = userTestId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Find the user's address
  const address = await Address.findOne({ user: userId });

  if (!address) {
    return res.status(404).json({ error: "Address not found for the user." });
  }

  res.json({ user, address });
};
