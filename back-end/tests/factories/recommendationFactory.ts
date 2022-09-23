import { prisma } from "../../src/database"
import { CreateRecommendationData } from "../../src/services/recommendationsService"

export function recommendationValidBody(): CreateRecommendationData {
    return {
        name: "super vídeo mega ultra maneiro",
        youtubeLink: "https://www.youtube.com/watch?v=Nqy5B8R40Pg"
    }
}

export function recommendationInvalidBody() {
    return {
        name: {obj: "obj"},
        youtubeLink: "https://www.youtube.com/watch?v=Nqy5B8R40Pg"
    }
}

export async function getIdByName(name: string) {
    const response = await prisma.recommendation.findFirst({
        where: {
            name
        }
    });
    return response.id;
}

