const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // ── Plugins ────────────────────────────────────────────────────────────────
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // ── Pass-through copies ────────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  // Netlify / Decap CMS uploads land here
  eleventyConfig.addPassthroughCopy("src/uploads");

  // ── Collections ────────────────────────────────────────────────────────────

  // Logo / Graphic Design projects
  eleventyConfig.addCollection("logoProjects", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/work/logo-graphic-design/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  // No-Code Web projects
  eleventyConfig.addCollection("noCodeProjects", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/work/no-code-web/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  // Factory projects
  eleventyConfig.addCollection("factoryProjects", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/work/factory-project/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  // ── Filters ────────────────────────────────────────────────────────────────
  eleventyConfig.addFilter("slugify", (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );

  // ── Markdown options ───────────────────────────────────────────────────────
  const markdownIt = require("markdown-it");
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  eleventyConfig.setLibrary("md", md);

  // ── Dev server ─────────────────────────────────────────────────────────────
  eleventyConfig.setServerOptions({ showAllHosts: true });

  // ── Directory config ───────────────────────────────────────────────────────
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
