<template>
  <div class="bg-decor" aria-hidden="true">
    <div class="bg-blob bg-blob-1"></div>
    <div class="bg-blob bg-blob-2"></div>
    <div class="bg-blob bg-blob-3"></div>
    <div class="bg-blob bg-blob-4"></div>
    <div class="bg-blob bg-blob-5"></div>
  </div>
</template>

<style scoped>
.bg-decor {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.45;
  animation: float 22s ease-in-out infinite;
  will-change: transform;
}

/* Apple-style muted palette — deep navy with gray undertones */
.bg-blob-1 {
  width: 550px;
  height: 550px;
  background: linear-gradient(135deg, #4a5568, #3d4f6b);
  top: -10%;
  left: -5%;
  animation-delay: 0s;
}

/* Apple sage/teal — muted green-blue */
.bg-blob-2 {
  width: 420px;
  height: 420px;
  background: linear-gradient(135deg, #6b8a7a, #557a6e);
  top: 35%;
  right: -6%;
  animation-delay: -5s;
}

/* Apple gold/starlight — warm amber */
.bg-blob-3 {
  width: 380px;
  height: 380px;
  background: linear-gradient(135deg, #b8956a, #c9a87c);
  bottom: -12%;
  left: 15%;
  animation-delay: -11s;
}

/* Apple sky blue — sierra blue inspired */
.bg-blob-4 {
  width: 320px;
  height: 320px;
  background: linear-gradient(135deg, #7b95a8, #8faabc);
  top: 55%;
  left: 45%;
  animation-delay: -16s;
}

/* Apple mauve/lavender — muted purple-gray */
.bg-blob-5 {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, #8b8294, #9d94a6);
  top: -5%;
  right: 25%;
  animation-delay: -8s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(40px, -40px) scale(1.08);
  }
  50% {
    transform: translate(-25px, 30px) scale(0.92);
  }
  75% {
    transform: translate(-35px, -25px) scale(1.04);
  }
}
</style>
