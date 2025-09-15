import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PrivacyPolicyView from "../views/PrivacyPolicyView.vue";
import ConditionsView from "../views/ConditionsView.vue";
import QuestionView from "../views/QuestionView.vue";
import CreateAccView from "../views/account/CreateAccView.vue";
import ConfirmAccView from "../views/account/ConfirmAccView.vue";
import ContactView from "../views/ContactView.vue";
import LogAccView from "../views/account/LogAccView.vue";
import ResetAccView from "../views/account/ResetAccView.vue";
import AboutUsView from "../views/AboutUsView.vue";
import ProductView from "../views/ProductView.vue";
import ProductSingleView from "../views/ProductSingleView.vue";
import WhishlistView from "../views/WhishlistView.vue";
import ShoppingCartView from "../views/ShoppingCartView.vue";
import PaymentSuccessfullView from "../views/PaymentSuccessfullView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import ProfileView from "../views/ProfileView.vue";
import OtpView from "../views/OtpView.vue";
import OrdersView from "../views/account/OrdersView.vue";
import AddressView from "../views/account/AddressView.vue";
import ResetView from "../views/account/ResetAccView.vue";
import AccountDetailsView from "../views/account/AccountDetailsView.vue";
import { isAuthenticated } from "../utils/authUtils.js";

// // Authentication guard function
// function requireAuth(to, from, next) {
//   if (isAuthenticated()) {
//     // User is authenticated, allow access
//     next();
//   } else {
//     // User is not authenticated, redirect to login
//     next("/login");
//   }
// }

// // Guest guard function (for login/register pages)
// function requireGuest(to, from, next) {
//   if (isAuthenticated()) {
//     // User is already authenticated, redirect to profile
//     next("/profile");
//   } else {
//     // User is not authenticated, allow access to login/register
//     next();
//   }
// }

function requireAuth(to, from, next) {
  next(); // always allow
}

function requireGuest(to, from, next) {
  next(); // always allow
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/policy",
      name: "policy",
      component: PrivacyPolicyView,
      meta: {
        title: "Privacy Policy",
      },
    },
    {
      path: "/terms",
      name: "terms",
      component: ConditionsView,
      meta: {
        title: "Terms & Conditions",
      },
    },
    {
      path: "/faq",
      name: "faq",
      component: QuestionView,
      meta: {
        title: "FAQ",
      },
    },
    {
      path: "/create-account",
      name: "account",
      component: CreateAccView,
      meta: {
        title: "Create Account",
      },
      beforeEnter: requireGuest,
    },

    {
      path: "/signup",
      name: "signup",
      component: ConfirmAccView,
      meta: {
        title: "Create Account",
      },
      beforeEnter: requireGuest,
    },

    {
      path: "/contact",
      name: "contact",
      component: ContactView,
      meta: {
        title: "Contact",
      },
    },

    {
      path: "/login",
      name: "login",
      component: LogAccView,
      meta: {
        title: "Login",
      },
      beforeEnter: requireGuest,
    },

    // {
    //   path: "/reset",
    //   name: "reset",
    //   component: ResetAccView,
    //   meta: {
    //     title: "Login",
    //   },
    //   beforeEnter: requireGuest,
    // },

    {
      path: "/about",
      name: "about",
      component: AboutUsView,
      meta: {
        title: "About Us",
      },
    },

    {
      path: "/product",
      name: "product",
      component: ProductView,
      meta: {
        title: "Shop",
      },
    },

    {
      path: "/product/:id",
      name: "single",
      component: ProductSingleView,
      props: true, // pass route params as props
      meta: {
        title: "Product",
      },
    },

    {
      path: "/paymentsuccessfull",
      name: "paymentsuccessfull",
      component: PaymentSuccessfullView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
      beforeEnter: requireGuest,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: {
        title: "Profile",
      },
      beforeEnter: requireAuth,
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
      meta: {
        title: "Orders",
      },
      beforeEnter: requireAuth,
    },
    {
      path: "/address",
      name: "address",
      component: AddressView,
      meta: {
        title: "Address",
      },
      beforeEnter: requireAuth,
    },
    {
      path: "/account-details",
      name: "account-details",
      component: AccountDetailsView,
      meta: {
        title: "Account Details",
      },
      beforeEnter: requireAuth,
    },
    {
      path: "/reset",
      name: "reset",
      component: ResetView,
      meta: {
        title: "Reset",
      },
      beforeEnter: requireAuth,
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: WhishlistView,
      meta: {
        title: "Wish List",
      },
      beforeEnter: requireAuth,
    },

    {
      path: "/cart",
      name: "cart",
      component: ShoppingCartView,
      meta: {
        title: "Cart",
      },
    },

    {
      path: "/otp",
      name: "otp",
      component: OtpView,
      meta: {
        title: "Otp",
      },
      beforeEnter: requireGuest,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

// // Global navigation guard to check authentication on every route change
// router.beforeEach((to, from, next) => {
//   const authenticated = isAuthenticated();

//   // If user is authenticated and trying to access login/register pages, redirect to profile
//   if (authenticated && (to.name === "login" || to.name === "account")) {
//     next("/profile");
//     return;
//   }

//   // If user is not authenticated and trying to access protected routes, redirect to login
//   if (!authenticated) {
//     const protectedRoutes = ["profile", "wishlist"];
//     if (protectedRoutes.includes(to.name)) {
//       next("/login");
//       return;
//     }
//   }

//   next();
// });

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
