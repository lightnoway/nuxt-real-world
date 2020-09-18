<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href>Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href>Global Feed</a>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{name:'profile-username',params:{username:article.author.username}}">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{name:'profile-username',params:{username:article.author.username}}"
                  class="author"
                >{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createdAt}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart" :class="{active:article.favorited}"></i>
                {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name:'article-slug',params:{slug:article.slug}}" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                v-for="pos of totalPage"
                class="page-item"
                :class="{active:page === pos}"
                :key="pos"
                @click="changePage(pos)"
              >
                <a class="page-link" href @click.prevent>{{pos}}</a>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a v-for="tag of cleanTags" :key="tag" href class="tag-pill tag-default">{{tag}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticles } from "@/api/article";
import { getTags } from "@/api/tag";
const pageSize = 10;
export default {
  watchQuery: ["page"],
  async asyncData({ query }) {
    // 服务端执行, 客户端呢?比如从其他页跳转到首页
    console.log(
      "客户端也执行",
      "当从其他页跳转过来时",
      "整体逻辑应在客户端,服务端一致"
    );
    const page = parseInt(query.page || 1, 10);
    const offset = (page - 1) * pageSize;
    const [
      {
        data: { articles, articlesCount },
      },
      {
        data: { tags },
      },
    ] = await Promise.all([
      getArticles(offset, { limit: pageSize }),
      getTags(),
    ]);
    // debugger;
    console.log("tags", tags);
    return {
      articles,
      articlesCount,
      page,
      tags,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / pageSize);
    },
    cleanTags() {
      const white = String.fromCharCode(8204);
      return this.tags.filter((t) => t && t !== white);
    },
  },
  methods: {
    changePage(page) {
      this.$router.push({ path: "/", query: { page } });
    },
  },
};
</script>