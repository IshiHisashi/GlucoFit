import { Articles, IArticles } from "../../model/Articles";
import { User, IUser } from "../../model/User";
import { Types } from "mongoose";

type GetInsightsArgs = {
  userId?: string;
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

    getUserRecentArticles: async (
      _: any,
      { userId, cursor, limit }: GetInsightsArgs
    ): Promise<ArticlesConnection> => {
      const defaultLimit = 10;

      // Fetch the user by ID
      const user: IUser | null = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const recentlyReadIds = user.recently_read_articles_array;
      let filteredIds = recentlyReadIds.map((id) => new Types.ObjectId(id));
      if (cursor) {
        const cursorIndex = filteredIds.findIndex(
          (id) => id.toString() === cursor
        );
        if (cursorIndex >= 0) {
          filteredIds = filteredIds.slice(cursorIndex + 1);
        }
      }
      const articles = await Articles.find({ _id: { $in: filteredIds } })
        .limit(limit || defaultLimit)
        .exec();

      let endCursor: string | null = null;
      if (articles.length > 0) {
        const lastArticle = articles[articles.length - 1];
        if (lastArticle && lastArticle._id instanceof Types.ObjectId) {
          endCursor = lastArticle._id.toString();
        }
      }

      // Check if there are more articles based on the limit
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
