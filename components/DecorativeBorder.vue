<template>
  <div class="relative w-full h-5 overflow-hidden">
    <!-- Left edge (fixed width) -->
    <svg
      class="absolute left-0 top-0 h-full"
      width="37"
      height="20"
      viewBox="0 0 37 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
    >
      <path
        d="M13.164 18.7095C20.164 13.7095 25.164 11.7095 37.164 11.7095M13.164 0.709473C20.164 5.70947 25.164 7.70947 37.164 7.70947M1.164 9.70947H37.164"
        stroke="#5E5E5E"
        stroke-linecap="round"
      />
    </svg>

    <!-- Center lines (stretches) -->
    <div class="absolute left-[37px] right-[37px] top-0 h-full">
      <svg class="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
        <!-- Top line -->
        <line x1="0" y1="7.7" x2="100" y2="7.7" stroke="#5E5E5E" stroke-linecap="butt" />
        <!-- Middle line -->
        <line x1="0" y1="9.7" x2="100" y2="9.7" stroke="#5E5E5E" stroke-linecap="butt" />
        <!-- Bottom line -->
        <line x1="0" y1="11.7" x2="100" y2="11.7" stroke="#5E5E5E" stroke-linecap="butt" />
      </svg>
    </div>

    <!-- Right edge (fixed width) -->
    <svg
      class="absolute right-0 top-0 h-full"
      width="37"
      height="20"
      viewBox="0 0 37 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMid meet"
    >
      <path
        d="M24.5 18.7095C17.5 13.7095 12.5 11.7095 0.5 11.7095M24.5 0.709473C17.5 5.70947 12.5 7.70947 0.5 7.70947M36.5 9.70947H0.5"
        stroke="#5E5E5E"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup></script>
