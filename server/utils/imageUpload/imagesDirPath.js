import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDirPath = path.join(__dirname, "..", "..", "images");

export default imagesDirPath;
