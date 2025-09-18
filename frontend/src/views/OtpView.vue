<template>
  <main>
    <Header :isScrolled="isScrolled" />
    <HeaderMob />
    <div class="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p>Phone Number Verification</p>
            </div>
            <div class="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your phone {{ maskedPhoneNumber }}</p>
            </div>
          </div>
          <div>
            <form @submit.prevent="handleVerify">
              <div class="flex flex-col space-y-16">
                <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <template v-for="(digit, idx) in otpDigits" :key="idx">
                    <div class="w-16 h-16">
                      <input
                        v-model="otpDigits[idx]"
                        @input="handleOtpInput(idx, $event)"
                        @keydown="handleKeydown(idx, $event)"
                        class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        maxlength="1"
                        :ref="'otpInput' + idx"
                      />
                    </div>
                  </template>
                </div>
                <div class="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      :disabled="isLoading || !isOtpComplete"
                      class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {{ isLoading ? "Verifying..." : "Verify Account" }}
                    </button>
                  </div>
                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <button
                      type="button"
                      @click="handleResend"
                      :disabled="isResending"
                      class="flex flex-row items-center text-blue-600 disabled:text-gray-400"
                    >
                      {{ isResending ? "Sending..." : "Resend" }}
                    </button>
                  </div>
                  <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {{ errorMessage }}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api.js";
import Header from "../components/Header.vue";
import HeaderMob from "../components/HeaderMob.vue";
import Footer from "../components/Footer.vue";

const router = useRouter();
const isScrolled = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const isResending = ref(false);

// OTP digits
const otpDigits = reactive(["", "", "", ""]);

// Computed properties
const isOtpComplete = computed(() => otpDigits.every((digit) => digit !== ""));
const otpValue = computed(() => otpDigits.join(""));

// Get signup data from localStorage
const signupData = ref(null);
const phoneNumber = computed(() => signupData.value?.phoneNumber || "");

// Masked phone number for display
const maskedPhoneNumber = computed(() => {
  if (!phoneNumber.value) return "****";
  const phone = phoneNumber.value;
  if (phone.length <= 4) return "*".repeat(phone.length);
  const lastFour = phone.substring(phone.length - 4);
  const maskedFront = "*".repeat(phone.length - 4);
  return `${maskedFront}${lastFour}`;
});

// OTP input focus helpers
function handleOtpInput(index, event) {
  const value = event.target.value;
  if (!/^\d*$/.test(value)) {
    otpDigits[index] = "";
    return;
  }
  otpDigits[index] = value;
  if (value && index < 3) {
    nextTick(() => {
      const nextInput = document.querySelector(`[ref="otpInput${index + 1}"]`);
      if (nextInput) nextInput.focus();
    });
  }
}
function handleKeydown(index, event) {
  if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
    nextTick(() => {
      const prevInput = document.querySelector(`[ref="otpInput${index - 1}"]`);
      if (prevInput) prevInput.focus();
    });
  }
}

// OTP verification
async function handleVerify() {
  if (!isOtpComplete.value) return;
  errorMessage.value = "";
  

  // let nextPath = localStorage.getItem("nextHiddenPath") || "/profile";

  // if (nextPath === "1") {
  //   nextPath = "/profile";
  // } else if (nextPath === "2") {
  //   nextPath = "/checkout";
  // }
  isLoading.value = true;
// alert(nextPath);

  try {
    const response = await api.post("/customers/verify-otp", {
      phoneNumber: phoneNumber.value,
      otp: otpValue.value,
    });
    if (response.data.isSuccess) {
      localStorage.setItem("jwt", response.data.token);
      localStorage.removeItem("signup_data");
      router.push("/login");
    } else {
      errorMessage.value = response.data.message || "OTP verification failed.";
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      "Server error. Please try again later.";
  } finally {
    isLoading.value = false;
  }
}

// Resend OTP
async function handleResend() {
  errorMessage.value = "";
  isResending.value = true;
  try {
    await api.post("/customers/send-otp", signupData.value);
    errorMessage.value = "OTP resent successfully.";
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      "Failed to resend OTP. Please try again.";
  } finally {
    isResending.value = false;
  }
}

// On mount, get signup data and focus first input
onMounted(() => {
  const storedData = localStorage.getItem("signup_data");
  if (!storedData) {
    router.push("/create-account");
    return;
  }
  signupData.value = JSON.parse(storedData);
  nextTick(() => {
    const firstInput = document.querySelector(`[ref="otpInput0"]`);
    if (firstInput) firstInput.focus();
  });
});
</script>