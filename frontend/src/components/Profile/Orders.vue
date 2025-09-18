<template>
    <div class="flex flex-col justify-center lg:px-20 px-5 bg-white">
      <div class="w-full flex justify-start mb-8">
        <span
          class="text-[20px] md:text-[32px] font-quicksand font-[700] pb-2 border-b-4 border-secondary w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2"
        >
          Orders
        </span>
      </div>
      <div class="ml-2 font-quicksand pb-5 font-[600] text-[11px] text-[#898989]">
        <span class="mr-1">Home</span>/<span class="ml-1">Orders</span>
      </div>
      <div class="grid md:grid-cols-5 gap-5">
        <AccountNav />
        <div class="md:col-span-4 py-4 md:pr-[100px]">
            <div class="flex-auto block py-8 pt-6 px-9">
                <div class="overflow-x-auto">
                    <table
                    class="w-full my-0 align-middle text-dark border-neutral-200"
                    >
                    <thead class="align-bottom">
                        <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                        <th class="pb-3 md:text-start md:min-w-[175px] min-w-[50px]">Order</th>
                        <th class="pb-3 md:text-end md:min-w-[100px] min-w-[50px]">Date</th>
                        <th class="pb-3 md:text-end md:min-w-[100px] min-w-[50px]">Status</th>
                        <th class="pb-3 md:pr-12 text-end md:min-w-[175px] min-w-[50px]">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, i) in orders" class="border-b border-dashed last:border-b-0">
                        <td class="p-3 pl-0">
                            <div class="flex items-center">
                            <div class="flex flex-col justify-start">
                                <router-link :to="`/user-order-single/${order._id}`">
                                <a
                                    href="javascript:void(0)"
                                    class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                >
                                {{ order.refNo }}
                                </a>
                                </router-link>


                            </div>
                            </div>
                        </td>
                        <td class="p-3 pr-0 text-end">
                            <span
                            class="font-semibold text-light-inverse text-md/normal"
                            >  {{ formatDate(order.createdAt) }}</span
                            >
                        </td>
                        <td class="p-3 pr-0 text-end">
                            <span
                            class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                            >
                            {{ deliveredStatus(order.isDelivered) }}
                            </span>
                        </td>
                        <td class="p-3 pr-12 text-end">
                            <span
                            class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                            >
                            USD  {{ order.totalAmount }}

                            </span>
                        </td>
                        <td class="pr-0 text-start">
                            <router-link :to="`/user-order-single/${order._id}`">
                            <span
                                class="font-semibold text-light-inverse text-md/normal hover:text-primary"
                            >View</span
                            ></router-link>


                        </td>
                        <td class="p-3 pr-0 text-end">
                            <router-link :to="`/user-order-single/${order._id}`">
                            <button
                                class="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"
                            >
                            <span
                                class="flex items-center justify-center p-0 m-0 leading-none shrink-0"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                                </svg>
                            </span>
                            </button>
                            </router-link>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import { useAuth } from "../../composables/useAuth.js";
    import AccountNav from "../account/AccountNav.vue";
  
    const router = useRouter();
    const { user, logout: authLogout, initAuth } = useAuth();
    const userInfo = ref({});
  
    const logout = () => {
      authLogout();
    };
  
    onMounted(() => {
      // Initialize authentication state
      initAuth();
  
      // Set user info from the composable
      if (user.value) {
        userInfo.value = user.value;
      } else {
        // If no user data, redirect to login
        router.push("/login");
      }
    });
  </script>
  