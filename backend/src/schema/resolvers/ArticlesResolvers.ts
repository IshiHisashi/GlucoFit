import { Articles, IArticles } from "../../model/Articles";

const articlesResolvers = {
  Query: {
    getArticle: async (_: any, { id }: { id: string }): Promise<IArticles | null> => {
      return await Articles.findById(id);
    },
    
    getArticles: async (): Promise<IArticles[]> => {
      return await Articles.find();
    },
  },
  Mutation: {
    createArticle: async (_: any, args: Partial<IArticles>): Promise<IArticles> => {
      const newArticle = new Articles(args);
      return await newArticle.save();
    },   
    updateArticle: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IArticles>
    ): Promise<IArticles | null> => {
      return await Articles.findByIdAndUpdate(id, args, { new: true });
    }, 
    deleteArticle: async (_: any, { id }: { id: string }): Promise<string> => {
      await Articles.findByIdAndDelete(id);
      return "Article deleted successfully";
    },
  },
};

export default articlesResolvers;
