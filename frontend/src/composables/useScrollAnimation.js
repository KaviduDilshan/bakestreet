import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  onMounted(() => {
    // Fade in and slide up animation for sections
    gsap.utils.toArray('.animate-on-scroll').forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power2.out'
      })
    })

    // Scale animation for images
    gsap.utils.toArray('.animate-scale').forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
      })
    })

    // Stagger animation for multiple elements
    gsap.utils.toArray('.stagger-group').forEach((group) => {
      const elements = group.querySelectorAll('.stagger-item')
      gsap.from(elements, {
        scrollTrigger: {
          trigger: group,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

    // Text reveal animation
    gsap.utils.toArray('.text-reveal').forEach((text) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out'
      })
    })
  })
} 