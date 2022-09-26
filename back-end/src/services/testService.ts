import { reset } from "../repositories/testRepository.js";

export async function truncate() {
    await reset();
}