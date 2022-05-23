<template>
  <transition
    name="custom"
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div :key="currentImage">
      <img
        :src="activeData.image"
        :key="activeData.text"
        :alt="`Skilled with ${activeData.text}`"
        width="248"
      />
      <div class="text-xl font-bold" v-if="showText">
        {{ activeData.text }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    list: Array,
    showText: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentImage: 0,
    };
  },
  computed: {
    activeData() {
      const preData = this.list[this.currentImage];

      return {
        text: preData.name,
        image: require(`@/assets/${preData.image}`),
      };
    },
  },
  created() {
    this.switchImages();
  },
  methods: {
    switchImages() {
      setInterval(() => {
        const newValue = this.currentImage + 1;
        this.currentImage = newValue > this.list.length - 1 ? 0 : newValue;
      }, 5000);
    },
  },
};
</script>

<style>
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
