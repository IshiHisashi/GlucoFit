import mongoose from "mongoose";

/**
 * Utility function to dynamically populate fields.
 * @param {mongoose.Query} query - The query object (e.g., User.findById())
 * @param {Array<string>} populationPaths - An array of paths to populate.
 * @returns {mongoose.Query} - The populated query.
 */
const populateFields = (
  query: mongoose.Query<any, any>,
  populationPaths: string[]
) => {
  populationPaths.forEach((path) => {
    query.populate({
      path,
      select: "-__v",
    });
  });
  return query;
};

export default populateFields;
