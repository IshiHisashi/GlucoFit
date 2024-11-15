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
  edges: IArticlesWithFavorite[];
  pageInfo: PageInfo;
}

interface IArticlesWithFavorite extends IArticles {
  isFavorite: boolean;
}

const articlesResolvers = {
  Query: {
    getArticle: async (
      _: any,
      { id, userId }: { id: string; userId: string }
    ): Promise<IArticlesWithFavorite | null> => {
      const article = await Articles.findById(id);
      if (!article) {
        return null;
      }
    
      // Check if the article is in the user's favorites
      const user = await User.findById(userId);
      const isFavorite = user ? user.favourite_articles.includes(id) : false;
    
      // Return the article with the `id` field and `isFavorite` flag
      return { 
        ...article.toObject(), 
        id: article._id.toString(), // Ensure `id` field is set
        isFavorite 
      } as IArticlesWithFavorite;
    },
    


    getArticles: async (): Promise<IArticles[]> => {
      return await Articles.find();
    },
    getAllArticlesPagination: async (
      _: any,
      { cursor, limit, userId }: { cursor?: string; limit?: number; userId: string }
    ): Promise<ArticlesConnection> => {
      const defaultLimit = 10;
      const startIndex = cursor ? parseInt(cursor) : 0;
      const itemsPerPage = limit || defaultLimit;
    
      const articles = await Articles.find()
        .skip(startIndex)
        .limit(itemsPerPage)
        .exec();
    
      const user = await User.findById(userId);
      const favouriteArticles = user ? user.favourite_articles : [];
    
      const articlesWithFavorite: IArticlesWithFavorite[] = articles.map((article) => ({
        id: article._id.toString(), // Ensure ID is a string
        ...article.toObject(),
        isFavorite: favouriteArticles.includes(article._id.toString()),
      })) as IArticlesWithFavorite[];
    
      const hasNextPage = articles.length === itemsPerPage;
      const newCursor = hasNextPage ? (startIndex + itemsPerPage).toString() : null;
    
      return {
        edges: articlesWithFavorite,
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
      const user = await User.findById(userId);
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
      const paginatedIds = articleIds.slice(startIndex, startIndex + itemsPerPage);
    
      const articles = await Articles.find({
        _id: { $in: paginatedIds },
      }).exec();
    
      // Add 'isFavorite' field and ensure 'id' is a string
      const articlesWithFavorite: IArticlesWithFavorite[] = paginatedIds
        .map((id) => {
          const article = articles.find((a) => a._id.toString() === id.toString());
          if (!article) return null;
    
          return {
            id: article._id.toString(), // Explicitly set 'id' as a string
            ...article.toObject(),
            isFavorite: user.favourite_articles.includes(id),
          };
        })
        .filter(Boolean) as IArticlesWithFavorite[];
    
      const hasNextPage = startIndex + itemsPerPage < articleIds.length;
      const newCursor = hasNextPage ? (startIndex + itemsPerPage).toString() : null;
    
      return {
        edges: articlesWithFavorite,
        pageInfo: {
          hasNextPage,
          endCursor: newCursor,
        },
      };
    },    
    getArticlesBySearch: async (
      _: any,
      { searchWord }: { searchWord: string }
    ): Promise<Partial<IArticles>[]> => {
      if (!searchWord || searchWord.trim() === "") {
        throw new Error("Search word cannot be empty");
      }
    
      const articles = await Articles.find({
        $or: [
          { article_name: { $regex: searchWord, $options: "i" } },
          { article_desc: { $regex: searchWord, $options: "i" } },
        ],
      }).exec();
    
      // Map _id to id and cast to Partial<IArticles>[]
      return articles.map(article => ({
        id: article._id.toString(),
        article_name: article.article_name,
        article_thumbnail_address: article.article_thumbnail_address,
        article_desc: article.article_desc,
        article_url: article.article_url,
        article_genre: article.article_genre,
        diabetes_type: article.diabetes_type,
      })) as Partial<IArticles>[];
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
