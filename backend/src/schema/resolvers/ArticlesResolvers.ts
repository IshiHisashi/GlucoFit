import { Articles, IArticles } from "../../model/Articles";
import { Types } from "mongoose";

type GetInsightsArgs = {
  cursor?: string;
  limit?: number;
};

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface ArticlesConnection {
  edges: IArticles[];
  pageInfo: PageInfo;
}

const articlesResolvers = {
  Query: {
    getArticle: async (
      _: any,
      { id }: { id: string }
    ): Promise<IArticles | null> => {
      return await Articles.findById(id);
    },

    getArticles: async (): Promise<IArticles[]> => {
      return await Articles.find();
    },

    getArticlesPagination: async (
      _: any,
      { cursor, limit }: GetInsightsArgs
    ): Promise<ArticlesConnection> => {
      const defaultLimit = 10;
      const cursorFilter = cursor
        ? { _id: { $gt: new Types.ObjectId(cursor) } }
        : {};
      const articles = await Articles.find(cursorFilter)
        .limit(limit || defaultLimit)
        .exec();

      let endCursor: string | null = null;
      if (articles.length > 0) {
        const lastArticle = articles[articles.length - 1];
        if (lastArticle && lastArticle._id instanceof Types.ObjectId) {
          endCursor = lastArticle._id.toString();
        }
      }

      const hasNextPage = !!limit && articles.length === limit;

      return {
        edges: articles,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
      };
    },
  },
  Mutation: {
    createArticle: async (
      _: any,
      args: Partial<IArticles>
    ): Promise<IArticles> => {
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
