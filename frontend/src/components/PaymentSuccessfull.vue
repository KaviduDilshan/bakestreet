<template>
    <div class="flex flex-col justify-center lg:px-20 px-5  bg-white">
      
      <div class="w-full  flex justify-start mb-8">
        <span
          class="text-[20px] md:text-[32px] font-quicksand font-[700] pb-2 border-b-4 border-secondary w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2"
        >
            Payment Successful
        </span>
      </div>
      <div class="ml-2 font-quicksand pb-5 font-[600] text-[11px] text-[#898989]"><span class="mr-1">Home</span>/<span class="ml-1">Payment Successful</span></div>
      <div class="bg-[#F5F5F5] py-5 grid  justify-center">
        <div class=" grid justify-center">
            <img src="../assets/img/paymentsuccessfull/check_mark.png" alt="Check Mark" class="w-[169px] h-[169px] place-items-center">
        </div>
       
        <div class="text-[20px] text-center mb-5 font-quicksand md:text-[30px] font-[700] pb-2 w-full text-[#000000]">
            Payment Successful
        </div>
        <div class="text-[10px] text-center font-quicksand md:text-[25px] font-[500] md:w-full text-[#000000]">
            Your payment has been successfully processed.
        </div>
        <div class="text-[10px] text-center font-quicksand md:text-[25px] font-[500] mb-[50px] w-full text-[#000000]">
            Now you can go to the homepage & discover new products.
        </div>
        <div class="grid justify-center">
            <button @click="goHome" class="md:text-[20px] text-[15px] text-center place-items-center font-quicksand  font-[600] uppercase text-[#FFFFFF] bg-secondary rounded-[8px] py-[10px] md:w-[386px] w-[200px]">
                Continue Shopping
            </button>
        </div>
        

      </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  localStorage.removeItem("cart"); 
  // clear local storage cart
});

const goHome = () => {
  router.push({ name: "home" }); // or router.push("/")
};
</script>
