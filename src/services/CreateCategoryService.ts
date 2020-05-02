import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<string> {
    const categoriesRepository = getRepository(Category);

    const categorieExists = await categoriesRepository.findOne({
      where: { title },
    });

    if (categorieExists) {
      return categorieExists.id;
    }

    const categorie = categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(categorie);

    return categorie.id;
  }
}

export default CreateCategoryService;
