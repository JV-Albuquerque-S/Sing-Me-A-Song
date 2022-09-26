import {recommendationValidBody, recommendationInvalidBody, getIdByName } from '../factories/recommendationFactory';
import { recommendationService } from '../../src/services/recommendationsService';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import dotenv from 'dotenv';

dotenv.config();

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('POST /recommendations', () => {
    it('Should create a new recommendation', async () => {
        const createRecommendation = recommendationValidBody();

        jest
            .spyOn(recommendationRepository, 'findByName')
            .mockImplementationOnce((): any => {});
        jest
            .spyOn(recommendationRepository, 'create')
            .mockImplementationOnce((): any => {});

        await recommendationService.insert(createRecommendation);

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
    });
    it('Should not create repeated recommendation', async () => {
        const createRecommendation = recommendationValidBody();

        jest
            .spyOn(recommendationRepository, 'findByName')
            .mockImplementationOnce((): any => {
                return createRecommendation;
            });
        
        const response = recommendationService.insert(createRecommendation);

        expect(response).rejects.toEqual({
            message: 'Recommendations names must be unique',
            type: 'conflict',
        });
        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).not.toBeCalled();
    });
});

describe('POST /:id/upvote', () => {
    it('Should increase the score of id', async () => {
        const createRecommendation = recommendationValidBody();
        const id = 1;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {
                return {...createRecommendation, id};
            });
        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementationOnce((): any => {
                return {...createRecommendation, id};
            });
        
        await recommendationService.upvote(id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    });
    it('Should not increase the score on invalid id', async () => {
        const id = 1;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {});
        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementationOnce((): any => {}); 
            
        const response = recommendationService.upvote(id);
        
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).not.toBeCalled();
        expect(response).rejects.toEqual({message: '', type: 'not_found'});
    });
});

describe('POST /:id/downvote', () => {
    it('Should decrease the score of id', async () => {
        const createRecommendation = recommendationValidBody();
        const score = 1;
        const id = 1;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {
                return {...createRecommendation, id, score};
            });
        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementationOnce((): any => {
                return {...createRecommendation, id, score};
            });

        await recommendationService.downvote(id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    });
    it('Should delete recommendation with score less or equal to -6', async () => {
        const createRecommendation = recommendationValidBody();
        const id = 1;
        const score = -6;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {
                return {...createRecommendation, id, score};
            });
        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementationOnce((): any => {
                return {...createRecommendation, id, score};
            });
        jest
            .spyOn(recommendationRepository, 'remove')
            .mockImplementationOnce((): any => {});

        await recommendationService.downvote(id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    });
    it('Should not decrease the score on invalid id', async () => {
        const id = 1;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {});
        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementationOnce((): any => {}); 
            
        const response = recommendationService.downvote(id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).not.toBeCalled();
        expect(response).rejects.toEqual({message: '', type: 'not_found'});
    });
});

describe('GET /recommendations', () => {
    it('Should return recommendations', async () => {
        const recommendations = [recommendationValidBody(), recommendationValidBody()];

        jest
            .spyOn(recommendationRepository, 'findAll')
            .mockImplementationOnce((): any => {recommendations});
            
        await recommendationService.get();

        expect(recommendationRepository.findAll).toBeCalled();
    });
});

describe('GET /top/:amount', () => {
    it('Should return most voted recommendations', async () => {
        const recommendations = [recommendationValidBody(), recommendationValidBody()];
        const amount = 5;

        jest
            .spyOn(recommendationRepository, 'getAmountByScore')
            .mockImplementationOnce((): any => {recommendations});

        await recommendationService.getTop(amount);

        expect(recommendationRepository.getAmountByScore).toBeCalledWith(amount);
    });
});

describe('GET /random', () => {
    it('Should return a recommendations with score bigger than 10', async () => {
        const createRecommendation = recommendationValidBody();
        const recommendationData = { ...createRecommendation, id: 1, score: 15 };
        jest
            .spyOn(Math, "random")
            .mockImplementationOnce((): any => {
                return 0.6;
            });
        jest
          .spyOn(recommendationRepository, "findAll")
          .mockImplementationOnce((): any => {
            return [recommendationData];
          });
    
        const returnRecommendation = await recommendationService.getRandom();
    
        expect(recommendationRepository.findAll).toBeCalled();
        expect(returnRecommendation).toBe(recommendationData);
    });
    it("Should find no recommendations", async () => {
        jest.spyOn(Math, "random").mockImplementationOnce((): any => {
          return 0.8;
        });
        jest
          .spyOn(recommendationRepository, "findAll")
          .mockImplementationOnce((): any => {
            return [];
          });
    
        jest
          .spyOn(recommendationRepository, "findAll")
          .mockImplementationOnce((): any => []);
    
        const response = recommendationService.getRandom();
    
        expect(recommendationRepository.findAll).toBeCalled();
        expect(response).rejects.toEqual({ message: "", type: "not_found" });
    });
});