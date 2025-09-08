/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         prata: ['Prata', 'serif'],
         poppins: ['Poppins', 'serif'],
        // 'sans': ['Caslon', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        // => @media (min-width: 375px) { ... }
  
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        "primary": "#00512F",
        "secondary":'#D22245',
        "text-color": "#222222"
      }, 
      backgroundImage: {
        "about-img": "url('/src/assets/aboutUs/bg.png')",
        "man-1": "url('/src/assets/selection/man-1.svg')",
        "man-2": "url('/src/assets/selection/man-2.svg')",
        "hero-1": "url('/src/assets/hero/hero-man-1.svg')",
        "hero-2": "url('/src/assets/hero/hero-man-2.svg')",
        "inner-bg": "url('/src/assets/innerbg.png')",
        "inner-about-bg": "url('/src/assets/innerabout.png')",
        "inner-product-bg": "url('/src/assets/innerproduct.png')",
        "radial-gold": "radial-gradient(circle, #FFF3D0 0%, #EEEEEE 100%)",
        "footer-img": "url('/src/assets/footer/footer.png')",
        "hero-img": "url('/src/assets/home/hero-bg.png')",
        "product-img": "url('/src/assets/home/product.png')",
      
      },

      keyframes: {
        'mouse-run': {
          '0%': { top: '-25px' },
          '100%': { top: '50px' },
        },
      },
      animation: {
        'mouse-run': 'mouse-run 2.2s cubic-bezier(.4,0,.2,1) infinite',
      },
     },
   },
  plugins: [],
}

