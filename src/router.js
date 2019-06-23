import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import BookShelf from './components/BookShelf.vue'
import Categories from './components/Categories.vue'
import Rankings from './components/Rankings.vue'
import Book from './components/book/Book.vue'
import Reader from './components/book/Reader.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirects: '/home',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/bookshelf',
        component: BookShelf
    },
    {
        path: '/categories',
        component: Categories
    },
    {
        path: '/rankings',
        component: Rankings
    },
    {
        path: '/book/:id',
        component: Book
    },
    {
        path: '/reader/:id',
        component: Reader
    }
]

export default new Router({
    routes
});