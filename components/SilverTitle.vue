<template>
  <div class="flex items-center justify-center gap-2">
    <!-- Left flourish -->
    <svg
      width="36"
      height="16"
      viewBox="0 0 36 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.5 13.8562C9.93564 10.5229 18.2079 9.167 25.8119 9.167H35M5.5 1.83366C9.93564 5.167 18.2079 6.50033 25.8119 6.50033H35M0.5 7.66667L35 7.83366M10.604 0.5C15.0396 3.83333 18.2079 5.16667 25.8119 5.16667H35M10.604 15.2125C15.0396 11.8791 18.2079 10.5458 25.8119 10.5458H35"
        stroke="#5E5E5E"
        stroke-linecap="round"
      />
    </svg>

    <h2 class="text-center text-ink font-heading font-normal leading-none">
      {{ title }}
    </h2>

    <!-- Right flourish -->
    <svg
      width="36"
      height="16"
      viewBox="0 0 36 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M30 1.85632C25.5644 5.18966 17.2921 6.54553 9.68812 6.54553H0.5M30 13.8789C25.5644 10.5455 17.2921 9.2122 9.68812 9.2122H0.5M35 8.04586L0.5 7.87886M24.896 15.2125C20.4604 11.8792 17.2921 10.5459 9.68812 10.5459H0.5M24.896 0.500041C20.4604 3.83337 17.2921 5.16671 9.68812 5.16671H0.5"
        stroke="#5E5E5E"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .silver-text {
    /* Subtle silver gradient with a soft inner glow */
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      #e6e6e6 30%,
      #bdbdbd 50%,
      #e9e9e9 72%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.25);
  }
</style>
