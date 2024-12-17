import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuideView from "@/views/GuideView.vue";
import OrderView from "@/views/OrderView.vue";
import PrintResultView from "@/views/PrintResultView.vue";
import PrintQittanceView from "@/views/PrintQittanceView.vue";
import PrintDocumentView from "@/views/PrintDocumentView.vue";
import ReportView from "@/views/ReportView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/guide',
      name: 'guide',
      component: GuideView,
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView,
    },
    {
      path: '/print',
      name: 'print',
      component: PrintResultView,
    },
    {
      path: '/print/quittance/:id',
      name: 'print-quittance',
      component: PrintQittanceView,
    },
    {
      path: '/print/document/:id',
      name: 'print-document',
      component: PrintDocumentView,
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView,
    }
  ],
})

export default router
