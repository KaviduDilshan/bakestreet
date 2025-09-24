<template>
  <section v-if="product" class="w-[100vw] overflow-x-hidden">
    <div class="bg-white py-10 px-5 lg:px-24">
      <!-- Top Section -->
      <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start font-[Poppins]">
        <!-- Image -->
        <div class="flex gap-0">
          <div
            class="relative w-full h-[380px] md:h-[466px] lg:h-[500px] bg-[#C7C7C7] overflow-hidden flex items-center justify-center">
            <img :src="product.item_image_1" :alt="product.item_name"
              class="object-cover w-[300px] md:h-[350px] h-[330px]" />
            <img src="../assets/product/heart.png" alt="Heart"
              class="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow p-1" />
            <img src="../assets/product/search.png" alt="Search"
              class="absolute top-16 right-4 w-8 h-8 bg-white rounded-full shadow p-1" />
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-2xl lg:text-[20px] font-bold mb-2">
            {{ product.item_name }} ({{ product.brand_name }})
          </h1>

          <div class="md:flex items-center">
            <span class="flex text-sm lg:text-[15px] items-center">
              <img src="../assets/product/star.png" alt="Wishlist" class="w-24 h-16 object-contain" />
              <span class="text-[#898989] text-sm lg:text-[11px]">(3 Reviews)</span>
            </span>
            <span class="md:ml-10 text-sm lg:text-[15px]">
              <span class="font-semibold text-black">Availability:</span>
              <span :class="currentStock > 0 ? 'text-green-600' : 'text-red-600'" class="ml-1">
                {{ currentStock > 0 ? "In Stock" : "Out of Stock" }}
              </span>
            </span>
          </div>

          <!-- Price -->
          <div class="flex items-center mb-2">
            <span class="font-extrabold text-lg text-black">
              Rs.{{ formatPrice(displayedPrice) }}
            </span>
            <span v-if="originalPrice > displayedPrice" class="text-gray-500 line-through ml-3">
              Rs.{{ formatPrice(originalPrice) }}
            </span>
          </div>

          <!-- Short Description -->
          <p class="text-black mb-4 lg:text-[13px]">
            {{ product.item_short_description }}
          </p>

          <!-- Variations -->
          <div v-for="attr in allAttributes" :key="attr.attribute_id" class="mb-4">
            <p class="font-semibold mb-1">{{ attr.attribute_name }}:</p>
            <div class="flex gap-2 flex-wrap">
              <label v-for="varItem in attr.variations" :key="varItem.p1variation_id"
                class="flex items-center gap-1 cursor-pointer">
                <input type="radio" :name="'attr_' + attr.attribute_id" :value="varItem.p1variation_id"
                  v-model="selectedVariations[attr.attribute_id]" />
                {{ varItem.p1variation_name }}
              </label>
            </div>
          </div>

          <!-- Quantity -->
          <div class="flex flex-col sm:flex-row items-center sm:justify-start w-full sm:max-w-xs mb-4 gap-4">
            <div class="flex border border-[#A1A1A1] rounded overflow-hidden bg-white">
              <button @click="decrement"
                class="w-12 h-12 flex items-center justify-center text-2xl font-semibold text-gray-700 hover:bg-gray-100 border-r border-[#A1A1A1] disabled:opacity-50"
                :disabled="quantity <= 1" type="button">
                -
              </button>
              <input type="number" :value="quantity" class="w-12 h-12 text-center border-0 font-medium" readonly />
              <button @click="increment"
                class="w-12 h-12 flex items-center justify-center text-2xl font-semibold text-gray-700 hover:bg-gray-100 border-l border-[#A1A1A1]"
                type="button">
                +
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="flex justify-center sm:justify-start w-full">
            <button class="h-12 px-[28px] text-white font-semibold rounded flex items-center justify-center transition"
              :class="{
                'bg-secondary hover:bg-gray-800': !addedToCart,
                'bg-green-600': addedToCart,
                'opacity-50 pointer-events-none': currentStock <= 0
              }" @click="addToCartSession" :disabled="currentStock <= 0 || addedToCart">
              {{ addedToCart ? "ADDED TO CART ✅" : "ADD TO CART" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="md:block hidden">
        <div class="flex justify-center space-x-8 border-b border-gray-200 mb-4 mt-8 text-sm lg:text-[15px] font-bold">
          <button v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name" :class="[
            'pb-2 transition-colors',
            activeTab === tab.name
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500 hover:text-black'
          ]">
            {{ tab.label }}
          </button>
        </div>
        <div v-if="activeTab === 'Description'" class="mt-4">
          <p class="font-bold mb-3">Product Information:</p>
          <p class="text-sm text-gray-700">
            {{ product.item_long_description }}
          </p>
        </div>
        <div v-else-if="activeTab === 'Shipping & Returns'" class="mt-4">
          <p class="font-bold mb-3">Shipping & Returns:</p>
          <p class="text-sm text-gray-700">
            {{ product.item_shipping }}
          </p>
        </div>
        <div v-else-if="activeTab === 'Frequently Asked Questions'" class="mt-4">
          <p class="font-bold mb-3">Frequently Asked Questions:</p>
          <p class="text-sm text-gray-700">
            {{ product.item_faq }}
          </p>
        </div>
      </div>

      <!-- Related Products -->
      <section v-if="relatedProducts.length" class="py-10 px-5 lg:px-24">
        <h2 class="text-2xl font-bold mb-6">Related Products</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="prod in relatedProducts" :key="prod.item_id"
            class="bg-white shadow rounded p-4 flex flex-col items-center">
            <img :src="prod.item_image_1" :alt="prod.item_name" class="h-40 object-contain mb-2" />
            <h3 class="text-sm font-medium text-center">
              {{ prod.item_name }}
            </h3>
            <p class="font-bold text-lg">
              Rs. {{ formatPrice(prod.item_sell) }}
            </p>
            <button class="mt-2 bg-secondary text-white px-4 py-2 rounded" @click="goToProduct(prod.item_id)">
              View
            </button>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../services/api.js";
import { decryptId } from "../utils/crypto.js";


const route = useRoute();
const router = useRouter();

const product = ref(null);
const quantity = ref(1);
const selectedVariations = ref({});
const displayedPrice = ref(0);
const currentStock = ref(0);
const relatedProducts = ref([]);
const loading = ref(false);
const cartUpdated = ref(0);
const originalPrice = ref(0);

const tabs = [
  { name: "Description", label: "Description" },
  { name: "Shipping & Returns", label: "Shipping & Returns" },
  { name: "Frequently Asked Questions", label: "Frequently Asked Questions" },
  { name: "Reviews", label: "Reviews" }
];
const activeTab = ref("Description");

// Quantity functions
function increment() {
  quantity.value++;
}
function decrement() {
  if (quantity.value > 1) quantity.value--;
}


// Compute unique attributes
const allAttributes = computed(() => {
  if (!product.value) return [];
  const map = {};
  product.value.prices.forEach((price) => {
    price.attributes.forEach((attr) => {
      if (!map[attr.attribute_id]) {
        map[attr.attribute_id] = { ...attr, variations: [] };
      }
      attr.variations.forEach((v) => {
        if (
          !map[attr.attribute_id].variations.find(
            (x) => x.p1variation_id === v.p1variation_id
          )
        )
          map[attr.attribute_id].variations.push(v);
      });
    });
  });
  return Object.values(map);
});

// A computed property to get the current price/variation ID
const currentItemPrid = computed(() => {
  if (!product.value || !selectedVariations.value) return null;
  for (const price of product.value.prices) {
    const isMatch = price.attributes.every((attr) => {
      const sel = selectedVariations.value[attr.attribute_id];
      return sel && attr.variations.some((v) => v.p1variation_id === sel);
    });
    if (isMatch) {
      return price.item_prid;
    }
  }
  return null;
});

// Computed selected variation names
const selectedVariationNames = computed(() => {
  if (!product.value || !selectedVariations.value) return [];
  const names = [];
  product.value.prices.forEach((price) => {
    price.attributes.forEach((attr) => {
      const sel = selectedVariations.value[attr.attribute_id];
      if (sel) {
        const v = attr.variations.find((x) => x.p1variation_id === sel);
        if (v) names.push(`${attr.attribute_name}: ${v.p1variation_name}`);
      }
    });
  });
  return [...new Set(names)];
});

// ✅ Fixed: addedToCart now checks variationKey too
const addedToCart = computed(() => {
  const dummy = cartUpdated.value;

  if (!product.value || !currentItemPrid.value) return false;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const variationKey = selectedVariationNames.value.join(",");

  return cart.some(
    (item) =>
      item.id === product.value.item_id &&
      item.item_prid === currentItemPrid.value &&
      item.variationsnames === variationKey
  );
});

// Watch selected variations to update price & stock
watch(
  selectedVariations,
  () => {

    if (!product.value) return;
    let matched = null;
    for (const price of product.value.prices) {
      const isMatch = price.attributes.every((attr) => {
        const sel = selectedVariations.value[attr.attribute_id];
        return sel && attr.variations.some((v) => v.p1variation_id === sel);
      });
      if (isMatch) {
        matched = price;
        break;
      }
    }
    if (matched) {
      displayedPrice.value = matched.item_sell;
      originalPrice.value = matched.item_sell_original;
      currentStock.value = matched.item_stock;

    } else {
      displayedPrice.value = product.value.prices[0]?.item_sell || 0;
      originalPrice.value = product.value.prices[0]?.item_sell_original || 0;
      currentStock.value = product.value.prices[0]?.item_stock || 0;
    }
  },
  { deep: true, immediate: true }
);

// Watch route changes
watch(
  () => route.params.id,
  async (id) => {
    if (!id) return;
    loading.value = true;
    product.value = null;
    displayedPrice.value = 0;
    currentStock.value = 0;
    quantity.value = 1;
    selectedVariations.value = {};
    relatedProducts.value = [];

    try {
      const realId = decryptId(id);
      if (!realId) {
        console.error("Invalid product ID");
        return;
      }

      const res = await api.get(`items/${realId}`);
      product.value = res.data;

      // Auto-select first variation
      allAttributes.value.forEach((attr) => {
        if (attr.variations?.length)
          selectedVariations.value[attr.attribute_id] =
            attr.variations[0].p1variation_id;
      });

      if (product.value.subcategory_id) {
        const relatedRes = await api.get(
          `products/related/${product.value.subcategory_id}/${product.value.item_id}`
        );
        relatedProducts.value = relatedRes.data;
      }
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);




function addToCartSession() {
  if (currentStock.value <= 0) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const variationKey = selectedVariationNames.value.join(",");
  const item_prid = currentItemPrid.value;

  const index = cart.findIndex(
    (item) =>
      item.id === product.value.item_id &&
      item.item_prid === item_prid &&
      item.variationsnames === variationKey
  );

  if (index >= 0) {
    cart[index].quantity += quantity.value;
  } else {
    cart.push({
      id: product.value.item_id,
      item_prid: item_prid,
      name: product.value.item_name,
      brand: product.value.brand_name,
      price: Number(displayedPrice.value),
      image: product.value.item_image_1,
      quantity: quantity.value,
      variationsnames: variationKey
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  // Notify header to update
  window.dispatchEvent(new Event("cart-updated"));
  cartUpdated.value++;
}

// Navigate to related product
function goToProduct(itemId) {
  router.push(`/product/${itemId}`);
}

// Format price
function formatPrice(val) {
  return Number(val).toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
</script>
