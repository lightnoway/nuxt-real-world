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
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{name:'index',query:{tab:'your_feed'}}"
                  :class="{active:tab==='your_feed'}"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{name:'index'}"
                  :class="{active:tab==='global_feed'}"
                >Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{name:'index',query:{tag}}"
                  :class="{active:tab==='tag'}"
                >#{{tag}}</nuxt-link>
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
                <span class="date">{{article.createdAt|dayjs}}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
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
              <a
                v-for="tag of cleanTags"
                :key="tag"
                href
                class="tag-pill tag-default"
                @click.prevent="changePage(1,tag)"
              >{{tag}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  removeFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
const pageSize = 10;
export default {
  watchQuery: ["page", "tag", "tab"],
  data() {
    return {
      articles: [],
      articlesCount: 0,
      page: [],
      tags: [],
      tag: undefined,
      tab: undefined,
    };
  },
  async asyncData({ query, store }) {
    // 服务端执行, 客户端呢?比如从其他页跳转到首页
    // console.log(
    //   "客户端也执行",
    //   "当从其他页跳转过来时",
    //   "整体逻辑应在客户端,服务端一致"
    // );
    const page = parseInt(query.page || 1, 10);
    const offset = (page - 1) * pageSize;
    const tag = query.tag;
    const tab = tag
      ? "tag"
      : query.tab === "your_feed" && store.state.user
      ? "your_feed"
      : "global_feed";
    try {
      const [
        {
          data: { articles, articlesCount },
        },
        {
          data: { tags },
        },
      ] = await Promise.all([
        (tab === "your_feed" ? getFeedArticles : getArticles)({
          limit: pageSize,
          offset,
          tag,
        }),
        getTags(),
      ]);
      articles.forEach((a) => (a.favoriteDisabled = false));
      return {
        articles,
        articlesCount,
        page,
        tags,
        tag,
        tab,
      };
    } catch (error) {
      console.log("request error", error);
      console.dir(error);
    }
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / pageSize);
    },
    cleanTags() {
      const white = String.fromCharCode(8204);
      return this.tags.filter((t) => t && t[0] !== white);
    },
  },
  methods: {
    changePage(page, tag = this.$route.query.tag) {
      this.$router.push({
        name: "index",
        query: Object.assign({}, this.$route.query, { page, tag }),
      });
    },
    async onFavorite(article) {
      article.favoriteDisabled = true;
      const diff = article.favorited ? -1 : 1;
      article.favoritesCount += diff;
      try {
        const {
          data: { article: res },
        } = await (article.favorited ? removeFavorite : addFavorite)(
          article.slug
        );
        Object.assign(article, res);
      } catch (error) {
        article.favoritesCount -= diff;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>