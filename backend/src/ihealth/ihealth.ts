import userResolvers from "../schema/resolvers/userResolvers";
import { Request, Response, Express } from "express";
import axios from "axios";
import qs from "qs";

const accessTokenStore: {
  [key: string]: { AccessToken: string; RefreshToken: string };
} = {}; // In-memory storage

export const setupIHealthRoutes = (app: Express) => {
  const client_id = process.env.IHEALTH_CLIENT_ID;
  const client_secret = process.env.IHEALTH_CLIENT_SECRET;
  const redirect_uri = process.env.IHEALTH_REDIRECT_URI;
  const sc = process.env.IHEALTH_SYSTEM_SC;
  const sv = process.env.IHEALTH_SYSTEM_SV;
  const api_scope = "OpenApiBG";

  // iHealth OAuth2 flow
  app.get("/auth/ihealth", (req: Request, res: Response) => {
    const authUrl = `https://api.ihealthlabs.com:8443/OpenApiV2/OAuthv2/userauthorization/`;
    const params = qs.stringify({
      client_id,
      response_type: "code",
      redirect_uri,
      APIName: api_scope,
      state: "random_state_string",
    });

    res.redirect(`${authUrl}?${params}`);
  });

  // iHealth OAuth2 callback route
  app.get("/auth/callback", async (req: Request, res: Response) => {
    const { code } = req.query;

    try {
      // Exchange authorization code for an access token
      const response = await axios.post(
        "https://api.ihealthlabs.com:8443/OpenApiV2/OAuthv2/userauthorization/",
        qs.stringify({
          client_id,
          client_secret,
          grant_type: "authorization_code",
          redirect_uri,
          code,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const { AccessToken, RefreshToken, UserID } = response.data;
      await userResolvers.Mutation.updateUser(null, {
        id: "670202f50b3e86123bd741e4",
        iHealth_access_token: AccessToken,
        iHealth_refresh_token: RefreshToken,
        iHealth_user_id: UserID,
      });
      // console.log(response.data);

      // Store tokens (in-memory or in database)
      accessTokenStore["user"] = { AccessToken, RefreshToken };

      // Redirect user to frontend after successful authorization
      res.redirect("http://localhost:3000/dashboard"); // Adjust frontend URL as necessary
    } catch (error) {
      console.error("Error exchanging authorization code:", error);
      res.status(500).send("Authorization failed");
    }
  });

  // API route to fetch blood glucose data using the stored access token
  app.get("/api/blood-glucose", async (req, res) => {
    // Load ihealth info from mongoDB

    const token = accessTokenStore["user"]?.AccessToken;
    if (!token) {
      return res.status(401).send("User not authenticated");
    }

    try {
      const response = await axios.get(
        "https://api.ihealthlabs.com:8443/openapiv2/application/glucose.json",

        {
          params: {
            client_id,
            client_secret,
            access_token: token,
            sc,
            sv,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching blood glucose data:", error);
      res.status(500).send("Error fetching data");
    }
  });

  // Function to refresh access token
  const refreshAccessToken = async (refresh_token: any) => {
    try {
      const response = await axios.post(
        "https://api.ihealthlabs.com:8443/OpenApiV2/OAuthv2/userauthorization/",
        qs.stringify({
          client_id,
          client_secret,
          grant_type: "refresh_token",
          refresh_token,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const { AccessToken, RefreshToken } = response.data;
      // Update tokens
      accessTokenStore["user"] = { AccessToken, RefreshToken };
      return AccessToken;
    } catch (error) {
      console.error("Error refreshing access token", error);
      throw new Error("Failed to refresh access token");
    }
  };
};
