import { Articles, IArticles } from "../../model/Articles";
import { User, IUser } from "../../model/User";
import { Badges, IBadges } from "../../model/Badges";
import { Types } from "mongoose";
import { updateUserBadgeById } from "../../utils/userUtils";

type GetInsightsArgs = {
  userId?: string;
  cursor?: string;
  limit?: number;
  classification?: "recent" | "favorite";
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

    getAllArticlesPagination: async (
      _: any,
      { cursor, limit }: GetInsightsArgs
    ): Promise<ArticlesConnection> => {
      const defaultLimit = 10;

      const startIndex = cursor ? parseInt(cursor) : 0;

      const itemsPerPage = limit || defaultLimit;

      const articles = await Articles.find()
        .skip(startIndex)
        .limit(itemsPerPage)
        .exec();
      if (articles.length === 0) {
        return {
          edges: [],
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
          },
        };
      }
      const hasNextPage = articles.length === itemsPerPage;
      const newCursor = hasNextPage
        ? (startIndex + itemsPerPage).toString()
        : null;

      return {
        edges: articles as IArticles[],
        pageInfo: {
          hasNextPage,
          endCursor: newCursor,
        },
      };
    },

    getUserArticlesPagination: async (
      _: any,
      { userId, cursor, limit, classification }: GetInsightsArgs
    ): Promise<ArticlesConnection> => {
      const defaultLimit = 10;

      const user: IUser | null = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      let articleIds: string[];
      if (classification === "recent") {
        articleIds = user.recently_read_articles_array;
      } else if (classification === "favorite") {
        articleIds = user.favourite_articles;
      } else {
        articleIds = [];
      }

      const startIndex = cursor ? parseInt(cursor) : 0;
      const itemsPerPage = limit || defaultLimit;
      const paginatedIds = articleIds.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      const articles = await Articles.find({
        _id: { $in: paginatedIds },
      }).exec();
      const orderedArticles = paginatedIds
        .map((id) => {
          const article = articles.find(
            (article) => article._id.toString() === id.toString()
          );
          return article;
        })
        .filter(Boolean);

      if (orderedArticles.length === 0) {
        return {
          edges: [],
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
          },
        };
      }

      const hasNextPage = startIndex + itemsPerPage < articleIds.length;
      const newCursor = hasNextPage
        ? (startIndex + itemsPerPage).toString()
        : null;

      return {
        edges: orderedArticles as IArticles[],
        pageInfo: {
          hasNextPage,
          endCursor: newCursor,
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
    toggleFavouriteArticle: async (
      _: any,
      { userId, articleId }: { userId: string; articleId: string }
    ): Promise<{ badge: IBadges | null; message: string | null }> => {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const articleIndex = user.favourite_articles.indexOf(articleId);

      if (articleIndex > -1) {
        // If the article is already in favourites, remove it
        user.favourite_articles.splice(articleIndex, 1);
        await user.save();
        return { badge: null, message: "Article taken out from favourites." };
      } else {
        // If not in favourites, add it
        user.favourite_articles.unshift(articleId);
        await user.save();

        // See if the badge is already achieved
        const targetBadge = user.badges.find(
          (badge) => badge.badgeId.toString() === "670b21b1cb185c3905515db2"
        );
        if (targetBadge?.achieved) {
          return { badge: null, message: "Article added to favourites." };
        }

        // Check if the user has 10 or more saved (favourite article)
        if (user.favourite_articles.length >= 10) {
          await updateUserBadgeById(userId, "670b21b1cb185c3905515db2", true);
          const badgeDetails = (await Badges.findById(
            "670b21b1cb185c3905515db2"
          )) as IBadges | null;

          return { badge: badgeDetails, message: "Badge achieved!" };
        }
        return { badge: null, message: "Article added to favourites." };
      }
    },
  },
};

export default articlesResolvers;
