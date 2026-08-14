const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({
  "public": "/"
});

  // Date filter for templates  e.g. {{ date | date("d MMM yyyy") }}
  eleventyConfig.addFilter("date", (dateVal, format) => {
    return DateTime.fromJSDate(new Date(dateVal), { zone: "utc" }).toFormat(format || "dd LLL yyyy");
  });

  // Posts collection — newest first
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .reverse();
  });

  // Posts by category helpers
  eleventyConfig.addFilter("filterByCategory", (posts, cat) => {
    return posts.filter(p => p.data.category === cat);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
