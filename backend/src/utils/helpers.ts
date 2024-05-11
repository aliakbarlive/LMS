import jwt, { JwtPayload } from "jsonwebtoken";

export const extractNameFromEmail = (email: string): string => {
  // Logic to extract name from email
  // For example, if email is "john.doe@example.com", extract "John Doe"
  const [namePart] = email.split("@");
  const nameArray = namePart.split(".");
  const formattedName = nameArray
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return formattedName;
};

// Function to decode the Apple ID token
export const decodeAppleToken = (encodedToken: string): JwtPayload | null => {
  try {
    const decoded = jwt.decode(encodedToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    return decoded?.payload || null;
  } catch (error) {
    throw new Error("Failed to decode Apple ID token");
  }
};

/**
 * Returns a folder name based on the current date in the format "YYYYMMDD".
 *
 * @return {string} The folder name based on the current date
 */
export function getFolderName(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
