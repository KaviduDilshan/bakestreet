<template>
  <div class="flex flex-col lg:flex-row gap-6 px-5 md:px-20 py-10">
    <!-- Sidebar -->
    <aside class="w-full lg:w-1/4 space-y-6">
      <!-- Mobile dropdown -->
      <div class="flex flex-col items-center gap-2 text-center sm:hidden mb-4" @click.away="mobileSortOpen = true">
        <p class="text-sm text-gray-600">{{ resultsText }}</p>
        <div class="flex items-center gap-2">
          <span class="text-[16px] text-black font-bold">Sort by </span>
          <div class="relative">
            <div
              class="w-auto border border-[#D3CCCC] rounded px-3 py-2 cursor-pointer flex items-center space-x-2 text-sm"
              @click="mobileSortOpen = !mobileSortOpen">
              <span class="truncate">{{ selectedMobileSort }}</span>
              <img src="../assets/product/arrow.png" alt="Arrow" class="w-4 h-4 ml-2 transition-transform duration-300"
                :class="{ 'rotate-180': mobileSortOpen }" />
            </div>
            <div v-if="mobileSortOpen" class="absolute top-full left-0 w-full bg-white border rounded shadow z-20 mt-1">
              <ul class="text-sm">
                <li v-for="(option, idx) in sortOptions" :key="'mobile-' + idx" @click.stop="selectMobileSort(option)"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {{ option }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Content -->
      <div class="bg-white p-5 rounded-lg shadow space-y-4">
        <h2 class="font-bold text-[26px] mb-2">Category</h2>

        <!-- Main category div -->
        <!-- Main category div -->
        <div v-for="cat in shopCategories" :key="cat.id">
          <div class="flex justify-between items-center cursor-pointer border-b py-2" @click="
            Object.keys(expanded).forEach((id) => {
              if (id != cat.id) expanded[id] = false;
            });
          expanded[cat.id] = !expanded[cat.id];
          selectedMainCategory = cat.id;
          selectedSubcategory = null;
          selectedSubSubcategory = null;
          ">
            <span class="font-medium">{{ cat.title }}</span>
            <svg :class="[
              'w-4 h-4 transform transition-transform duration-300',
              expanded[cat.id] ? 'rotate-90' : 'rotate-0',
            ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <!-- Subcategories -->
          <ul v-if="expanded[cat.id]" class="pl-4 text-sm space-y-1 py-2 text-black">
            <li v-for="sub in cat.subcategories" :key="sub.id" class="cursor-pointer">
              <div class="flex justify-between items-center hover:text-primary cursor-pointer"
                @click="toggleSub(sub.id)">
                <span>{{ sub.title }}</span>
                <span>({{ categoryCounts[sub.id] || 0 }})</span>
              </div>


              <!-- Sub-subcategories -->
              <ul v-if="expandedSub[sub.id] && sub.subsubcategories && sub.subsubcategories.length"
                class="pl-4 text-xs space-y-1 text-gray-700">
                <li v-for="ssub in sub.subsubcategories" :key="ssub.id" class="cursor-pointer hover:text-primary"
                  @click.stop="selectedSubSubcategory = Number(ssub.id)">
                  {{ ssub.title }} (<span>{{ subSubcategoryCounts[Number(ssub.id)] || 0 }}</span>)
                </li>

              </ul>

            </li>
          </ul>
        </div>


        <!-- Price Filter -->
        <div>
          <h2 class="font-semibold text-lg mb-2">Price</h2>
          <p class="text-sm mb-2 text-[#9F9F9F] tracking-widest">
            The highest price is Rs.{{ rangeData.max.toLocaleString() }}
          </p>

          <div class="flex justify-center">
            <div class="relative w-[15rem]">
              <!-- Hidden Range Inputs -->
              <input type="range" step="100" :min="rangeData.min" :max="rangeData.max"
                v-model.number="rangeData.minprice" @input="updateThumbs"
                class="absolute w-full h-2 opacity-0 cursor-pointer z-20" />
              <input type="range" step="100" :min="rangeData.min" :max="rangeData.max"
                v-model.number="rangeData.maxprice" @input="updateThumbs"
                class="absolute w-full h-2 opacity-0 cursor-pointer z-20" />

              <!-- Track -->
              <div class="relative h-2 rounded bg-gray-200">
                <div class="absolute h-2 rounded bg-secondary" :style="{
                  left: rangeData.minthumb + '%',
                  right: 100 - rangeData.maxthumb + '%',
                }"></div>

                <!-- Thumbs -->
                <div class="absolute w-6 h-6 bg-secondary rounded-full -mt-2 -ml-3 cursor-pointer"
                  :style="{ left: rangeData.minthumb + '%' }"></div>
                <div class="absolute w-6 h-6 bg-secondary rounded-full -mt-2 -mr-3 cursor-pointer"
                  :style="{ left: rangeData.maxthumb + '%' }"></div>
              </div>

              <!-- Input Boxes -->
              <div class="flex justify-between items-center gap-5 py-5">
                <input type="number" v-model.number="rangeData.minprice" @input="updateThumbs"
                  class="px-3 py-2 border border-gray-200 rounded w-24 text-center" />
                <input type="number" v-model.number="rangeData.maxprice" @input="updateThumbs"
                  class="px-3 py-2 border border-gray-200 rounded w-24 text-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Products Grid -->
    <main class="w-full lg:w-3/4">
      <!-- Desktop dropdown -->
      <div class="justify-between items-center mb-6 hidden md:flex" @click.away="sortOpen = true">
        <p class="text-sm text-gray-600">{{ resultsText }}</p>
        <div class="flex items-center gap-2">
          <span class="text-[16px] text-black font-bold">Sort by</span>
          <div class="relative">
            <div
              class="w-auto border border-[#D3CCCC] rounded px-3 py-2 cursor-pointer flex items-center space-x-2 text-sm"
              @click="sortOpen = !sortOpen">
              <span class="truncate">{{ selectedSort }}</span>
              <img src="../assets/product/arrow.png" alt="Arrow" class="w-4 h-4 ml-2 transition-transform duration-300"
                :class="{ 'rotate-90': sortOpen }" />
            </div>
            <div v-if="sortOpen" class="absolute top-full left-0 w-full bg-white border rounded shadow z-20 mt-1">
              <ul class="text-sm">
                <li v-for="(option, idx) in sortOptions" :key="idx" @click.stop="selectSort(option)"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {{ option }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="(card, idx) in paginatedPros" :key="idx"
          class="bg-[#F5F5F5] rounded-lg shadow p-3 flex flex-col items-center text-center hover:shadow-lg transition">
          <div class="w-28 h-40 mb-4 overflow-hidden">
            <img :src="card.item_image_1" alt="Product Img" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm font-medium mb-1 px-6">{{ card.item_name }}</p>
          <p class="text-sm font-medium mb-1">{{ card.brand_name }}</p>
          <p class="text-black font-bold text-sm mb-2">
            Rs. {{ Number(card.min_price).toFixed(2).toLocaleString() }} –
            Rs. {{ Number(card.max_price).toFixed(2).toLocaleString() }}
          </p>
          <img src="../assets/product/star.png" alt="star" class="mb-4 h-3 w-26" />
          <router-link :to="{ name: 'single', params: { id: encryptId(card.item_id) } }"
            class="bg-secondary text-white md:py-1.5 py-1 px-[10px] w-full rounded-lg text-sm font-semibold hover:bg-primary text-center">
            Add To Cart
          </router-link>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-2 mt-10">
        <button @click="currentPage > 1 && currentPage--" class="px-3 py-1 border rounded text-sm">
          Previous
        </button>
        <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
          'px-3 py-1 border rounded text-sm',
          currentPage === page ? 'bg-blue-500 text-white' : '',
        ]">
          {{ page }}
        </button>
        <button @click="currentPage < totalPages ? currentPage++ : null" class="px-3 py-1 border rounded text-sm">
          Next
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import api from "../services/api.js";
import { encryptId } from "../utils/crypto.js";
import { useRoute } from "vue-router";


const route = useRoute();

// -------------------- Data --------------------
const pros = ref([]);
const isLoading = ref(true);
const shopCategories = ref([]);
const expanded = ref({});       // main categories
const expandedSub = ref({});    // subcategories
const selectedSubcategory = ref(null);
const selectedMainCategory = ref(null);
const selectedSubSubcategory = ref(null);
const product = ref(null);

watch(() => route.query.category, (newCatId) => {
  selectedMainCategory.value = newCatId ? Number(newCatId) : null;
  // This line ensures the sidebar category expands
  if (newCatId) {
    Object.keys(expanded.value).forEach(id => expanded.value[id] = false);
    expanded.value[Number(newCatId)] = true;
  }
}, { immediate: true });

// -------------------- Price Slider --------------------
const rangeData = ref({
  minprice: 0,
  maxprice: 10000,
  min: 100,
  max: 10000,
  minthumb: " ",
  maxthumb: " ",
});

const updateThumbs = () => {
  rangeData.value.minprice = Math.min(
    rangeData.value.minprice,
    rangeData.value.maxprice - 0
  );
  rangeData.value.maxprice = Math.max(
    rangeData.value.maxprice,
    rangeData.value.minprice + 100
  );

  rangeData.value.minthumb =
    ((rangeData.value.minprice - rangeData.value.min) /
      (rangeData.value.max - rangeData.value.min)) *
    100;
  rangeData.value.maxthumb =
    ((rangeData.value.maxprice - rangeData.value.min) /
      (rangeData.value.max - rangeData.value.min)) *
    100;
};



// -------------------- Filtering --------------------
const filteredPros = computed(() => {
  let products = pros.value;
  if (selectedMainCategory.value) {
    products = products.filter((i) => i.mcategory_id === selectedMainCategory.value);
  }
  if (selectedSubcategory.value) {
    products = products.filter((i) => i.scategory_id === selectedSubcategory.value);
  }
  if (selectedSubSubcategory.value) {
    products = products.filter((i) => i.spcategory_id === selectedSubSubcategory.value);
  }
  products = products.filter(
    (i) => i.max_price >= rangeData.value.minprice && i.min_price <= rangeData.value.maxprice
  );
  return products;
});

// -------------------- Pagination --------------------
const currentPage = ref(1);
const itemsPerPage = 12;

const paginatedPros = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPros.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredPros.value.length / itemsPerPage)
);

watch(filteredPros, () => {
  currentPage.value = 1;
});

// -------------------- Category Counts --------------------
const categoryCounts = computed(() => {
  const counts = {};
  const items = selectedMainCategory.value
    ? pros.value.filter((i) => i.mcategory_id === selectedMainCategory.value)
    : pros.value;

  items.forEach((i) => {
    if (i.scategory_id) counts[i.scategory_id] = (counts[i.scategory_id] || 0) + 1;
  });

  return counts;
});

const subSubcategoryCounts = computed(() => {
  const counts = {};
  const items = pros.value.filter(product => {
    const isMainCatMatch = !selectedMainCategory.value || product.mcategory_id === selectedMainCategory.value;
    const isSubCatMatch = !selectedSubcategory.value || product.scategory_id === selectedSubcategory.value;
    return isMainCatMatch && isSubCatMatch;
  });

  items.forEach(product => {
    if (product.spcategory_id) counts[product.spcategory_id] = (counts[product.spcategory_id] || 0) + 1;
  });

  return counts;
});

// -------------------- Results Text --------------------
const resultsText = computed(() => {
  const total = selectedMainCategory.value
    ? pros.value.filter((i) => i.mcategory_id === selectedMainCategory.value).length
    : pros.value.length;

  const showing = filteredPros.value.length;
  let categoryName = "All Items";

  if (selectedSubSubcategory.value) {
    const main = shopCategories.value.find(c => c.id === selectedMainCategory.value);
    const sub = main?.subcategories.find(s => s.id === selectedSubcategory.value);
    const ssub = sub?.subsubcategories.find(ss => ss.id === selectedSubSubcategory.value);
    categoryName = ssub?.title || "Items";
  } else if (selectedSubcategory.value) {
    const main = shopCategories.value.find(c => c.id === selectedMainCategory.value);
    const sub = main?.subcategories.find(s => s.id === selectedSubcategory.value);
    categoryName = sub?.title || "Items";
  } else if (selectedMainCategory.value) {
    const main = shopCategories.value.find(c => c.id === selectedMainCategory.value);
    categoryName = main?.title || "Items";
  }

  return `Showing ${showing} results from total ${total} “${categoryName}”`;
});

// -------------------- Sorting --------------------
const sortOpen = ref(false);
const sortOptions = ["Popularity", "Newest", "Price: Low to High", "Price: High to Low"];
const selectedSort = ref(sortOptions[0]);
const mobileSortOpen = ref(false);
const selectedMobileSort = ref(sortOptions[0]);

function selectSort(option) {
  selectedSort.value = option;
  sortOpen.value = false;
}
function selectMobileSort(option) {
  selectedMobileSort.value = option;
  mobileSortOpen.value = false;
}

// -------------------- Fetch Data --------------------
const fetchShopCategories = async () => {
  try {
    const res = await api.get('shopcategories');
    shopCategories.value = res.data || [];
    shopCategories.value.forEach((cat) => (expanded.value[cat.id] = false));
  } catch (err) {
    console.error(err);
    shopCategories.value = [];
  }
};

const fetchItems = async () => {
  try {
    isLoading.value = true;
    const res = await api.get("items-with-brand");
    pros.value = res.data || [];
  } catch (err) {
    console.error(err);
    pros.value = [];
  } finally {
    isLoading.value = false;
  }
};

const fetchPrices = async () => {
  try {
    const res = await api.get("item-prices");
    const prices = res.data || [];
    pros.value = pros.value.map((item) => {
      const priceObj = prices.find((p) => p.item_id === item.item_id);
      return {
        ...item,
        min_price: priceObj ? Number(priceObj.min_price) : 0,
        max_price: priceObj ? Number(priceObj.max_price) : 0,
      };
    });
  } catch (err) {
    console.error(err);
  }
};

// -------------------- Fetch Product by ID --------------------
const fetchProductById = async (id) => {
  try {
    const res = await api.get(`items/${id}`);
    product.value = res.data;
  } catch (err) {
    console.error("Error fetching product:", err);
  }
};

// -------------------- Toggle Subcategory --------------------
function toggleSub(subId) {
  Object.keys(expandedSub.value).forEach((id) => {
    if (id != subId) expandedSub.value[id] = false;
  });
  expandedSub.value[subId] = !expandedSub.value[subId];
  selectedSubcategory.value = subId;
  selectedSubSubcategory.value = null;
}

// -------------------- Payment Order Handling --------------------
const orderId = ref(null);
const paymentStatus = ref(null);

// -------------------- Init --------------------
onMounted(async () => {
  await fetchShopCategories();
  await fetchItems();
  await fetchPrices();
  updateThumbs();

  if (route.query.category) {
    selectedMainCategory.value = Number(route.query.category);
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("order_id");
  if (id) {
    orderId.value = id;
    try {
      const res = await api.post(`notify`, { order_id: id });
      paymentStatus.value = res.data.order_payment_status;
    } catch (err) {
      console.error("Error updating order payment status:", err);
    }
  }

  const productId = route.params.id;
  if (productId) await fetchProductById(productId);
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
}
</style>

