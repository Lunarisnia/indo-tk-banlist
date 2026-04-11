import path from "path";
import { loadTextFile } from "./file";

export async function loadBanlist() {
  const banlist: string[] = [];

  const rawBanlist = await loadTextFile(path.join(process.cwd(), "public", "banlist.txt"));
  banlist.push(...rawBanlist.split("\n").filter((value) => value != ""))

  return banlist
}
