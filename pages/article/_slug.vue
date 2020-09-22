<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <articleComments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle } from "@/api/article";
import articleMeta from "@/components/articleMeta";
import articleComments from "@/components/articleComments";
const md = require("markdown-it")();
export default {
  async asyncData({ params }) {
    const {
      data: { article },
    } = await getArticle(params.slug);
    article.body = md.render(article.body);
    return { article };
  },
  components: {
    articleMeta,
    articleComments,
  },
  head() {
    const { article } = this;
    return {
      title: `${article.title} - conduit`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: article.description,
        },
      ],
    };
  },
};
</script>