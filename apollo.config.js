module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "snapsnacks-backend",
      url:
        process.env.NODE_ENV === "production"
          ? "https://snapsnacks.onrender.com/graphql"
          : "http://localhost:4000/graphql",
    },
  },
};
