import { Job } from "../models/Job";

export const resolvers = {
  Query: {
    jobs: async () => {
      return await Job.findAll({ order: [["createdAt", "DESC"]] });
    },
  },
  Mutation: {
    createJob: async (
      _: any,
      args: { title: string; description: string; company: string; location: string }
    ) => {
      return await Job.create({
        title: args.title,
        description: args.description,
        company: args.company,
        location: args.location,
      });
    },
  },
};
