export default {
    hompage: require('@/views/Hompage').default,
    article: () => import('@/views/Article.vue'),
    progress: () => import('@/views/Progress.vue'),
    project: () => import('@/views/Project.vue'),
    about: () => import('@/views/About.vue'),
    articleDetail: () => import('@/views/ArticleDetail.vue')
}