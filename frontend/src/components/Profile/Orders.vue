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
          <div > <!-- class="overflow-x-auto" -->
            <table
              class="w-full my-0 align-middle text-dark border-neutral-200"
            >
              <thead class="align-bottom">
                <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                  <!-- <th class="pb-3 md:text-start md:min-w-[175px] min-w-[50px]">Order ID</th> -->
                  <th class="pb-3 md:text-center md:min-w-[100px] min-w-[50px]">
                    Order ID
                  </th>
                  <th class="pb-3 md:text-center md:min-w-[100px] min-w-[50px]">
                    Discount
                  </th>
                  <th class="pb-3 md:text-center md:min-w-[100px] min-w-[50px]">
                    Sub Total
                  </th>
                  <th class="pb-3 md:text-center md:min-w-[100px] min-w-[50px]">
                    Total
                  </th>
                  <th class="pb-3 md:text-center md:min-w-[100px] min-w-[50px]">
                    Date
                  </th>
                  <th class="pb-3 md:text-center md:min-w-[100px] min-w-[50px]">
                    Payment 
                  </th>
                  <th class="pb-3 md:text-center md:min-w-[100px] min-w-[50px]">
                    Delivery Status
                  </th>
                  <th class="pb-3 md:text-center md:min-w-[100px] min-w-[50px]">
                    Payment Type
                  </th>
                  <!-- <th class="pb-3 md:text-end text-blue-700 md:min-w-[100px] min-w-[50px]">View</th> -->
                  <!-- <th class="pb-3 md:pr-12 text-blue-700 text-end md:min-w-[175px] min-w-[50px]">View</th> -->
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(order, i) in orders"
                  :key="order.o_id"
                  class="border-b border-dashed last:border-b-0"
                >
                 
                  <td class="p-3 pr-0 text-center">
                    <span
                      class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                    >
                      {{order.o_id}}
                    </span>
                  </td>
                  <td class="p-3 pr-0 text-center">
                    <span
                      class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                    >
                      {{ order.order_discount }}
                    </span>
                  </td>
                  <td class="p-3 pr-0 text-center">
                    <span
                      class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                    >
                      {{ order.order_sub_total }}
                    </span>
                  </td>
                  <td class="p-3 pr-0 text-center">
                    <span
                      class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                    >
                      {{ order.order_total }}
                    </span>
                  </td>
                  <td class="p-3 pr-0 text-center">
                    <span
                      class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                    >
                      {{ formatDate(order.order_date) }}
                    </span>
                  </td>
                  <td class="p-3 pr-0 text-center">
                    <span
                      class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                    >
                      {{ paymentStatus(order.order_payment_status) }}
                    </span>
                  </td>
                  <td class="p-3 pr-0 text-center">
                    <span
                      class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                    >
                      {{ deliveredStatus(order.order_delivery_status) }}
                    </span>
                  </td>
                  <td class="p-3 pr-0 text-center">
                    <span
                      class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                    >
                      {{ paymentType(order.order_payment_type) }}
                    </span>
                  </td>
                  <!-- <td class="p-3 pr-12 text-end">
                            <span
                            class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"
                            >
                            USD  {{ order.totalAmount }}

                            </span>
                        </td> -->
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <!-- <router-link :to="`/user-order-single/${order.order_code}`"> -->
                      <span
                      @click="viewOrder(order.order_code)"
                        class="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors" >
                        View</span>
                      <!-- </router-link -->
                    
                  </td>
               
                  <!-- <td class="p-3 pr-0 text-end">
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
                        </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


<!-- Popup Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-lg w-[1000px] max-h-[80vh] overflow-y-auto p-6">
        <h2 class="text-xl font-bold mb-4">Order Details</h2>

        <!-- Order rows -->
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-2 py-1">Item</th>
              <th class="border px-2 py-1">SKU</th>
              <th class="border px-2 py-1">Qty</th>
              <th class="border px-2 py-1">Price</th>
              <th class="border px-2 py-1">Total</th>
              <th class="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in orderRows" :key="row.item_sku + row.p1variation_name">
              <td class="border px-2 py-1">{{ row.item_name+" "+row.variations }}</td>
              <td class="border px-2 py-1">{{ row.item_sku }}</td>
              <td class="border px-2 py-1">{{ row.or_quantity }}</td>
              <td class="border px-2 py-1">{{ row.or_item_sell }}</td>
              <td class="border px-2 py-1">{{ row.or_total }}</td>
              <td class="border px-2 py-1">{{ formatDate(row.or_date) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Close button -->
        <div class="mt-4 flex justify-end">
          <button
            @click="showModal = false"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
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
import api from "../../services/api.js";

const router = useRouter();
const { user, logout: authLogout, initAuth, getAuthData } = useAuth();
const userInfo = ref({});
const orders = ref([])
const customerId = ref(null);


const showModal = ref(false)
const orderRows = ref([])



const logout = () => {
  authLogout();
};

onMounted(async () => {
  // Initialize authentication state
  initAuth();

  const authData = getAuthData();
  // Set user info from the composable
  if (authData.customerId) {
    customerId.value = authData.customerId;
  } else {
    // If no user data, redirect to login
    router.push("/login");
  }

  try {
    const res = await api.get(`/orders/${customerId.value}`)
    orders.value = res.data.order
  } catch (err) {
    if (err.response) {
    // Server responded with a status (404, 500, etc.)
    if (err.response.status === 404) {
      console.warn("No orders found for this customer.")
      orders.value = []
    } else {
      console.error("Server error:", err.response.status, err.response.data)
    }
  } else {
    // Network error / server unreachable
    console.error("Network error:", err.message)
  }
  }


});

// Open modal and fetch order details
const viewOrder = async (orderId) => {
  try {
    const res = await api.get(`/order_rows/${orderId}`)
    orderRows.value = res.data.order_rows || []
    showModal.value = true
  } catch (err) {
    console.error("Error fetching order rows:", err)
  }
}

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString();
  //  + "  " + d.toLocaleTimeString();
};
const deliveredStatus = (status) => {
  if(status === "0"){
    return "Pending";
  }else if(status === "1"){
    return "Complete";
  }else if(status === "2"){
    return "Cancelled";
  }else{
    return "Unknown";
  }       
};
const paymentStatus = (status) => {
  return status == "1" ? "Paid" : "Pending";
};
const paymentType = (status) => {
  return status == "1" ? "Credit Card" : "Cash on Delivery";
};
</script>
